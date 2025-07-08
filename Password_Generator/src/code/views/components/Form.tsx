import * as React from 'react';
import Input from './Input';
import { SPFI } from '@pnp/sp';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import Table from './Table';

interface IFormProps {
  sp: SPFI;
  listName: string;
}

interface UserDataSchema {
  Name: string;
  Email: string;
  Address: string;
  Password: string;
}

const Form: React.FC<IFormProps> = ({ sp, listName }) => {
  const [userData, setUserData] = React.useState<UserDataSchema>({
    Name: "",
    Email: "",
    Address: "",
    Password: "",
  });

  const [reloadFlag, setReloadFlag] = React.useState<boolean>(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await sp.web.lists.getByTitle(listName).items.add({
        Title: userData.Name,
        Email: userData.Email,
        Address: userData.Address,
        Password: userData.Password,
      });
      alert("Employee data is saved");

      setUserData({ Name: "", Email: "", Address: "", Password: "" });

      setReloadFlag((prev) => !prev);
    } catch (err) {
      console.error("Something went wrong in handleSubmit: ", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            label='UserName'
            placeholder='Enter your Name'
            type='text'
            value={userData.Name}
            name="Name"
            setValue={handleChange}
          />
        </div>
        <div>
          <Input
            label='Email'
            placeholder='Enter your Email'
            type='email'
            value={userData.Email}
            name='Email'
            setValue={handleChange}
          />
        </div>
        <div>
          <Input
            label='Address'
            placeholder='Enter your Address'
            type='text'
            value={userData.Address}
            name='Address'
            setValue={handleChange}
          />
        </div>
        <div>
          <Input
            label='Password'
            placeholder='Enter your Password'
            type='password'
            value={userData.Password}
            name='Password'
            setValue={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <Table listName={listName} sp={sp} reloadFlag={reloadFlag} />
    </>
  );
};

export default Form;
