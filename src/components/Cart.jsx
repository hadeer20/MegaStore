export default function Cart({ products, onDecrease, onIncrease, onDelete }) {
  return (
    <>
      <div className="cart">
        {products.map((product) => (
          <CartItem
            key={product.id}
            item={product}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            onDelete={onDelete}
          />
        ))}
      </div>

      <OrderSummary products={products} />
    </>
  );
}
function CartItem({ item, onIncrease, onDecrease, onDelete }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name}></img>
      <div className="product-info">
        <h2>{item.name}</h2>
        <p>
          {" "}
          Size : <span>{item.size}</span>
        </p>
        <p>
          color : <span>{item.color}</span>
        </p>
        <h3>$ {item.price}</h3>
      </div>
      <div className="quantity">
        <button onClick={() => onDecrease(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onIncrease(item.id)}>+</button>
      </div>
      <button className="delete-btn" onClick={() => onDelete(item.id)}>
        🗑
      </button>
    </div>
  );
}

function OrderSummary({ products }) {
  const subTotal = products.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);

  const discount = subTotal * 0.1;
  const deliveryFee = 20;
  const total = subTotal - discount + deliveryFee;

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      <div className="summary-row">
        <span>Subtotal:</span>
        <span> ${subTotal}</span>
      </div>

      <div className="summary-row">
        <span>Total Items:</span>
        <span>
          {products.reduce((acc, cur) => {
            return acc + cur.quantity;
          }, 0)}
        </span>
      </div>

      <div className="summary-row">
        <span>Discount:</span>
        <span>${discount}</span>
      </div>

      <div className="summary-row">
        <span>Delivery Fee:</span>
        <span>${deliveryFee}</span>
      </div>

      <div className="summary-row total">
        <span>Total:</span>
        <span>${total}</span>
      </div>

      <button className="checkout-btn">Go to Checkout</button>
    </div>
  );
}
