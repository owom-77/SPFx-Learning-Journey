import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Header.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(() => !!localStorage.getItem("user"));

  const handleLoginChange = React.useCallback((event: Event) => {
    const customEvent = event as CustomEvent<{ loggedIn: boolean }>;
    setIsLoggedIn(customEvent.detail.loggedIn);
  }, []);

  React.useEffect(() => {
    window.addEventListener('spfx-login-change', handleLoginChange);
    return () => {
      window.removeEventListener('spfx-login-change', handleLoginChange);
    };
  }, [handleLoginChange]);

  React.useEffect(() => {
    const onStorage = (e: StorageEvent): void => {
      if (e.key === "user") {
        setIsLoggedIn(!!localStorage.getItem("user"));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Product",
      submenu: [
        { name: "All", path: "/product/all" },
        { name: "Electronics", path: "/product/electronics" },
        { name: "Jewelery", path: "/product/jewelery" },
        { name: "Men's clothing", path: "/product/men's clothing" },
        { name: "Women's clothing", path: "/product/women's clothing" }
      ],
    },
    ...(isLoggedIn ? [{ name: "Dashboard", path: "/user-dash" }] : []),
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  const handleLogout = (): void => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.dispatchEvent(new CustomEvent('spfx-login-change', { detail: { loggedIn: false } }));
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo} onClick={() => { setDropdownOpen(false); navigate('/'); }}>
          🛒 E-Commerce
        </div>
        <nav>
          <ul className={styles.navList}>
            {navItems.map(({ name, path, submenu }) => (
              <li
                key={name}
                className={styles.navItem}
                onMouseEnter={() => name === 'Product' && setDropdownOpen(true)}
                onMouseLeave={() => name === 'Product' && setDropdownOpen(false)}
              >
                {!submenu ? (
                  <button
                    onClick={() => { setDropdownOpen(false); navigate(path); }}
                    className={styles.navButton}
                  >
                    {name}
                  </button>
                ) : (
                  <>
                    <button
                      className={styles.navButton}
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                    >
                      {name} ▼
                    </button>
                    {dropdownOpen && (
                      <ul className={styles.dropdownMenu}>
                        {submenu.map(({ name: subName, path: subPath }) => (
                          <li key={subName} className={styles.dropdownItem}>
                            <button
                              onClick={() => { setDropdownOpen(false); navigate(subPath); }}
                              className={styles.dropdownButton}
                            >
                              {subName}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}

            {isLoggedIn ? (
              <li className={styles.navItem}>
                <button onClick={handleLogout} className={styles.navButton}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className={styles.navItem}>
                  <button onClick={() => { setDropdownOpen(false); navigate('/login'); }} className={styles.navButton}>
                    Login
                  </button>
                </li>
                <li className={styles.navItem}>
                  <button onClick={() => { setDropdownOpen(false); navigate('/signup'); }} className={styles.navButton}>
                    Sign Up
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
