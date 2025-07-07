import * as React from 'react';
import styles from '../styles/Login.module.scss';
import { ILoginProps } from '../interface/ILoginProps';
import eventEmitter from '../../utils/EventEmitter';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface UserData {
  Email: string;
  Password: string;
}

const Login: React.FC<ILoginProps> = ({ sp, listName }) => {
  const [userData, setUserData] = React.useState<UserData>({
    Email: "",
    Password: ""
  });

  const [err, setErr] = React.useState<string>("");
  const [emailInternalName, setEmailInternalName] = React.useState<string>("");
  const navigate = useNavigate();


  const findEmailInternalName = async (): Promise<void> => {
    try {
      const items = await sp.web.lists.getByTitle(listName).items.top(1).select("*")();
      if (items.length > 0) {
        const item = items[0];
        console.log("Debug item fields:", item);

        const emailField = Object.keys(item).find(key =>
          key.toLowerCase().includes("email")
        );

        if (emailField) {
          setEmailInternalName(emailField);
          console.log(`Email internal field name detected: ${emailField}`);
        } else {
          setErr("Could not find an Email field in list items.");
        }
      } else {
        setErr("No items found in the list to detect fields.");
      }
    } catch (error) {
      console.error("Error detecting Email internal field:", error);
      setErr("Failed to detect Email field. Check console.");
    }
  };

  React.useEffect(() => {
    void findEmailInternalName();
  }, [listName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if ([userData.Email, userData.Password].some((val) => val.trim() === "")) {
      setErr("All fields are compulsory");
      return;
    }

    if (!emailInternalName) {
      setErr("Email field is not detected yet, please wait and try again.");
      return;
    }

    try {
      const filterQuery = `${emailInternalName} eq '${userData.Email}'`;

      const items = await sp.web.lists
        .getByTitle(listName)
        .items
        .select("Id", "Title", emailInternalName, "Password")
        .filter(filterQuery)
        .top(1)();

      if (items.length > 0) {
        const user = items[0];
        console.log("Fetched user for login:", user);

        if (user.Password === userData.Password) {
          localStorage.setItem("user", JSON.stringify(user));
          eventEmitter.emit('loginStateChanged', true);
          setErr("");
          navigate('/user-dash');
          toast.success('Login successful!');
        } else {
          setErr("Incorrect password.");
        }
      } else {
        setErr("Email not found.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErr("Login failed. Please check console.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      {err && <p className={styles.errorMessage}>{err}</p>}

      <form onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
