// Product.tsx
import * as React from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';
import styles from '../styles/Product.module.scss';
import { SPFI } from '@pnp/sp';

interface ProductProps {
  sp: SPFI;
  orderListName: string;
}

const Product: React.FC<ProductProps> = ({ sp, orderListName }) => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  console.log(loading);
  console.log(error);

  React.useEffect(() => {
    setLoading(true);
    setError(null);

    const url =
      category && category.toLowerCase() !== 'all'
        ? `https://fakestoreapi.com/products/category/${category}`
        : 'https://fakestoreapi.com/products';

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Products {category && `- ${category}`}</h2>
      {products.length === 0 ? (
        <p className={styles.message}>No products found.</p>
      ) : (
        <div className={styles.grid}>
          {products.map(product => (
            <Card
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              description={product.description}
              sp={sp}
              orderListName={orderListName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
