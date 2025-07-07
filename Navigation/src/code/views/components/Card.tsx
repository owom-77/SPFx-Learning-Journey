import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Card.module.scss';
import modalStyles from '../styles/Modal.module.scss';
import Modal from './Modal';
import { toast } from 'react-toastify';
import { SPFI } from '@pnp/sp';

interface CardProps {
  image: string;
  title: string;
  price: number;
  description?: string;
  sp: SPFI;
  orderListName: string;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  price,
  description,
  sp,
  orderListName
}) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const user = localStorage.getItem('user');
  const parsedUser = user ? JSON.parse(user) : null;

  const isUserLoggedIn = (): boolean => !!parsedUser;

  const handleProtectedAction = async (action: () => Promise<void>) => {
    if (!isUserLoggedIn()) {
      toast.error('Please login to continue.');
      navigate('/login');
      return;
    }

    await action();
    setModalOpen(false);
  };

  const addToCart = async () => {
    try {
      await sp.web.lists.getByTitle(orderListName).items.add({
        Title: title,
        Email: parsedUser.Email,
        Action: "AddToCart",
        Price: price,
        ProductImage: { Url: image, Description: title },
        Quantity: 1,
        Date: new Date().toISOString(),
      });
      toast.success("Item added to cart!");
    } catch (error) {
      toast.error("Failed to add item to cart.");
      console.error(error);
    }
  };

  const buyNow = async () => {
    try {
      await sp.web.lists.getByTitle(orderListName).items.add({
        Title: title,
        Email: parsedUser.Email,
        Action: "Buy",
        Price: price,
        ProductImage: { Url: image, Description: title },
        Quantity: 1,
        Date: new Date().toISOString(),
      });
      toast.success("Purchase successful!");
    } catch (error) {
      toast.error("Purchase failed.");
      console.error(error);
    }
  };


  return (
    <>
      <div className={styles.card}>
        <img src={image} alt={title} className={styles.cardImage} />
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle} title={title}>
            {title.length > 50 ? title.slice(0, 50) + '...' : title}
          </h3>
          <p className={styles.cardPrice}>${price.toFixed(2)}</p>
          <button
            className={styles.cardButton}
            onClick={() => setModalOpen(true)}
          >
            View Details
          </button>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={modalStyles.modalLeft}>
          <img src={image} alt={title} className={modalStyles.modalImage} />
        </div>

        <div className={modalStyles.modalRight}>
          <div>
            <h2 className={modalStyles.modalTitle}>{title}</h2>
            <p className={modalStyles.modalDescription}>{description}</p>
            <p className={modalStyles.modalPrice}>${price.toFixed(2)}</p>
          </div>

          <div className={modalStyles.modalActions}>
            <button
              className={`${modalStyles.modalBtn} ${modalStyles.addToCart}`}
              onClick={() => handleProtectedAction(addToCart)}
            >
              Add to Cart
            </button>
            <button
              className={`${modalStyles.modalBtn} ${modalStyles.buyNow}`}
              onClick={() => handleProtectedAction(buyNow)}
            >
              Buy Now
            </button>

          </div>
        </div>
      </Modal>
    </>
  );
};

export default Card;
