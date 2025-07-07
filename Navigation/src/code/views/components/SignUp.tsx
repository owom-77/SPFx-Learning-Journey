import * as React from 'react'
import { ISignUpProps } from '../interface/ISignUpProps ';
import styles from '../styles/SignUp.module.scss'; 

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { useNavigate } from 'react-router-dom';

interface UserData {
  UserName: string;
  Email: string;
  Address: string;
  Password: string;
}

const SignUp: React.FC<ISignUpProps> = ({ sp, listName }) => {
  const [userData, setUserData] = React.useState<UserData>({
    UserName: "",
    Email: "",
    Address: "",
    Password: ""
  });

  const [error, setError] = React.useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if ([userData.UserName, userData.Email, userData.Address, userData.Password].some((val) => val.trim() === "")) {
      setError("All fields are compulsory");
      return;
    }

    try {
      await sp.web.lists.getByTitle(listName).items.add({
        Title: userData.UserName,
        Email: userData.Email,
        Address: userData.Address,
        Password: userData.Password
      });
      setError("");
      alert("Signup successful!");
      navigate('/login')
      setUserData({ UserName: "", Email: "", Address: "", Password: "" });
    } catch (err) {
      console.error("Something went wrong in signup: ", err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            name="UserName"
            placeholder="Enter your name"
            value={userData.UserName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="Email"
            placeholder="Enter your email"
            value={userData.Email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="Address"
            placeholder="Enter your address"
            value={userData.Address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="Password"
            placeholder="Enter your password"
            value={userData.Password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Sign Up</button>

        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
