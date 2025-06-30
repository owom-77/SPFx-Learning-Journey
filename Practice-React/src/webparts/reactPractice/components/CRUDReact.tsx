import * as React from 'react';
import { useState } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import List from './List';
import '../../style/form.css'

interface ICRUDReactProps {
  context: WebPartContext;
}

const CRUDReact: React.FC<ICRUDReactProps> = ({ context }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const body: string = JSON.stringify({
      Title: fullName,
      email: email,
      password: password,
    });
  
    const webUrl = context.pageContext.web.absoluteUrl;
    const listName = 'userData';
  
    try {
      const digestResponse = await fetch(`${webUrl}/_api/contextinfo`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose'
        }
      });
  
      const digestData = await digestResponse.json();
      const requestDigest = digestData.d.GetContextWebInformation.FormDigestValue;

      const response = await fetch(`${webUrl}/_api/web/lists/getbytitle('${listName}')/items`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-Type': 'application/json;odata=nometadata',
          'odata-version': '',
          'X-RequestDigest': requestDigest
        },
        body
      });
  
      if (response.ok) {
        alert('Item submitted successfully!');
        setFullName('');
        setEmail('');
        setPassword('');
      } else {
        const errorText = await response.text();
        console.error(errorText);
        alert('Error submitting the item.');
      }
    } catch (err) {
      console.error(err);
      alert('Unexpected error occurred.');
    }
  };
  

  return (
    <div>
      <h2>Submit Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label><br />
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
      <List context={context} />
    </div>
  );
};

export default CRUDReact;
