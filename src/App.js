import { useState } from "react";
import gamepad from "./images/1v.png";
import shoes from "./images/2v.png";
import jacket from "./images/3v.png";
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";

const allProducts = [
  {
    id: 1,
    name: "GP11 Shooter Gamedpad",
    image: gamepad,
    size: "Medium",
    color: "Black",
    price: 150,
    quantity: 1,
  },
  {
    id: 2,
    name: "Jr.Zoom Soccer Cleats",
    image: shoes,
    size: "Small",
    color: "Yellow",
    price: 200,
    quantity: 1,
  },
  {
    id: 3,
    name: "Quilted Satin Jacket",
    image: jacket,
    size: "Large",
    color: "Dark Blue",
    price: 500,
    quantity: 1,
  },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home");
  const totalItems = cart.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  function handleIncearse(id) {
    setCart(
      cart.map((product) => {
        return product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product;
      }),
    );
  }

  function addToCart(id) {
    const product = allProducts.find((product) => product.id === id);
    const existingProduct = cart.find((product) => product.id === id);
    if (existingProduct) {
      setCart(
        cart.map((product) => {
          return product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product;
        }),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function handleDecrease(id) {
    setCart(
      cart.map((product) => {
        return product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product;
      }),
    );
  }

  function deleteItem(id) {
    setCart(cart.filter((product) => product.id !== id));
  }

  return (
    <div>
      <Header
        totalItems={totalItems}
        onHomeClick={() => {
          setPage("home");
        }}
        onCartClick={() => setPage("cart")}
      />
      {page === "home" && (
        <Home products={allProducts} onAddToCart={addToCart} />
      )}
      {page === "cart" && (
        <>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-content">
                <div className="empty-icon">🛒</div>
                <h2>Your MegaStore Cart is empty</h2>
                <p>Looks like you haven't added anything yet.</p>

                <button onClick={() => setPage("home")}>Start Shopping</button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="page-title">Your Cart</h2>
              <main className="cart-page">
                <Cart
                  products={cart}
                  onIncrease={handleIncearse}
                  onDecrease={handleDecrease}
                  onDelete={deleteItem}
                />
              </main>
            </>
          )}
          {cart.length > 0 && (
            <div className="go-home">
              <button onClick={() => setPage("home")}>Go to Home</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
