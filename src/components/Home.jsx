export default function Home({ products, onAddToCart }) {
  return (
    <div className="products">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>${product.price}</p>

          <button onClick={() => onAddToCart(product.id)}>Add To Cart</button>
        </div>
      ))}
    </div>
  );
}
