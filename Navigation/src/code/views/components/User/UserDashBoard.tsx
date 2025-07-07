import * as React from 'react';
import styles from '../../styles/UserDashBoard.module.scss';
import { SPFI } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

interface User {
  Id: number;
  Title: string;
  Email: string;
  ProfilePicUrl?: string;
}

interface OrderItem {
  Id: number;
  Title: string;
  Price: number;
  ProductImage?: string;
  Quantity: number;
  Date: string;
}

interface UserDashBoardProps {
  user: User;
  onLogout: () => void;
  sp: SPFI;
  orderListName: string;
}

const UserDashBoard: React.FC<UserDashBoardProps> = ({ user, onLogout, sp, orderListName }) => {
  const [cartCount, setCartCount] = React.useState<number>(0);
  const [buyCount, setBuyCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [selectedList, setSelectedList] = React.useState<"cart" | "buy" | null>(null);
  const [cartItems, setCartItems] = React.useState<OrderItem[]>([]);
  const [buyItems, setBuyItems] = React.useState<OrderItem[]>([]);
  const [itemsLoading, setItemsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchCounts = async () => {
      try {
        const cartItemsRes = await sp.web.lists
          .getByTitle(orderListName)
          .items
          .filter(`Email eq '${user.Email}' and Action eq 'AddToCart'`)
          .top(5000)();

        const buyItemsRes = await sp.web.lists
          .getByTitle(orderListName)
          .items
          .filter(`Email eq '${user.Email}' and Action eq 'Buy'`)
          .top(5000)();

        setCartCount(cartItemsRes.length);
        setBuyCount(buyItemsRes.length);
      } catch (error) {
        console.error("Error fetching item counts", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchCounts();
  }, [sp, orderListName, user.Email]);

  const fetchItems = React.useCallback(async (type: "cart" | "buy") => {
    setItemsLoading(true);
    try {
      const items = await sp.web.lists
        .getByTitle(orderListName)
        .items
        .filter(`Email eq '${user.Email}' and Action eq '${type === "cart" ? "AddToCart" : "Buy"}'`)
        .top(5000)();

      if (type === "cart") {
        setCartItems(items);
      } else {
        setBuyItems(items);
      }
      setSelectedList(type);
    } catch (error) {
      console.error(`Error fetching ${type} items`, error);
    } finally {
      setItemsLoading(false);
    }
  }, [sp, orderListName, user.Email]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.profileCard}>
        <div className={styles.avatar}>
          {user.ProfilePicUrl ? (
            <img src={user.ProfilePicUrl} alt="Profile" />
          ) : (
            <div className={styles.placeholderAvatar}>
              {user.Title.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className={styles.userInfo}>
          <h2>Welcome, {user.Title}!</h2>
          <p>Email: {user.Email}</p>
        </div>
        <button className={styles.logoutButton} onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div
          className={styles.statCard}
          role="button"
          tabIndex={0}
          onClick={() => void fetchItems("cart")}
          onKeyDown={(e) => { if (e.key === "Enter") void fetchItems("cart"); }}
          style={{ cursor: 'pointer' }}
          title="Click to see items in cart"
        >
          <h3>🛒 Items in Cart</h3>
          <p className={styles.statNumber}>{loading ? 'Loading...' : cartCount}</p>
        </div>

        <div
          className={styles.statCard}
          role="button"
          tabIndex={0}
          onClick={() => void fetchItems("buy")}
          onKeyDown={(e) => { if (e.key === "Enter") void fetchItems("buy"); }}
          style={{ cursor: 'pointer' }}
          title="Click to see purchased items"
        >
          <h3>✅ Items Purchased</h3>
          <p className={styles.statNumber}>{loading ? 'Loading...' : buyCount}</p>
        </div>

        <div className={styles.statCard}>
          <h3>📨 Messages</h3>
          <p className={styles.statNumber}>3</p> 
        </div>
      </div>

      {/* Display items list */}
      <div style={{ marginTop: 30 }}>
        {itemsLoading && <p>Loading items...</p>}

        {!itemsLoading && selectedList === "cart" && (
          <>
            <h3>Your Cart Items</h3>
            {cartItems.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <ul className={styles.itemsList}>
                {cartItems.map(item => (
                  <li key={item.Id} className={styles.itemCard}>
                    <img src={item.ProductImage || 'https://via.placeholder.com/60'} alt={item.Title} />
                    <div>
                      <strong>{item.Title}</strong>
                      <p>Price: ${item.Price.toFixed(2)}</p>
                      <p>Quantity: {item.Quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {!itemsLoading && selectedList === "buy" && (
          <>
            <h3>Your Purchased Items</h3>
            {buyItems.length === 0 ? (
              <p>No purchased items found.</p>
            ) : (
              <ul className={styles.itemsList}>
                {buyItems.map(item => (
                  <li key={item.Id} className={styles.itemCard}>
                    <img src={item.ProductImage || 'https://via.placeholder.com/60'} alt={item.Title} />
                    <div>
                      <strong>{item.Title}</strong>
                      <p>Price: ${item.Price.toFixed(2)}</p>
                      <p>Quantity: {item.Quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashBoard;
