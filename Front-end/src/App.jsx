import React, { useState, useEffect } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading products:', err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', margin: '0 auto', maxWidth: '1100px', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <h2>🛍️ E-Commerce Store</h2>
        <div>
          🛒 Cart: <strong>{cart.length} items</strong> (${totalPrice.toFixed(2)})
        </div>
      </header>

      <main style={{ marginTop: '20px' }}>
        {loading ? (
          <p>Loading catalog...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {products.map((p) => (
              <div key={p.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                <h3 style={{ fontSize: '18px', margin: '10px 0 5px' }}>{p.name}</h3>
                <p style={{ color: '#666', fontSize: '14px', height: '40px' }}>{p.description}</p>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#2b8a3e' }}>${p.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(p)}
                  style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}