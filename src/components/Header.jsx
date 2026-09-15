export default function Header({ totalItems, onCartClick, onHomeClick }) {
  return (
    <header>
      <div>
        <h1 onClick={onHomeClick}>MegaStore</h1>
        <div className="cart-icon" onClick={onCartClick}>
          <i>🛒</i>
          <span>{totalItems}</span>
        </div>
      </div>
    </header>
  );
}
