import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Hello Pizza Co.</h1>
    </header>
  );
}
function Menu() {
  return (
    <main className="menu">
      <p>
        Authentic Italian cuisine. 6 creative dishes to choose from. All from
        our stone even, all organic, all delicious.
      </p>
      <h2>This is our Menu</h2>
      {pizzaData.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone even, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza props={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        "We are currently waiting for our brand new menu!"
      )}
    </main>
  );
}
function Pizza({ props: { soldOut, photoName, name, ingredients, price } }) {
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt="pizza" />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? "Sold Out." : price}</span>
      </div>
    </li>
  );
}
function Footer() {
  const [date, setDate] = useState(new Date());
  useEffect(function () {
    setInterval(() => setDate(new Date()), 1000);
  }, []);
  return (
    <footer className="footer">
      <div className="order">
        <p>
          {date.toLocaleTimeString()}{" "}
          {new Date(date).getHours() >= 10 && new Date(date).getHours() <= 20
            ? "We're currently open! Come visit us today."
            : "Sorry, we're closed right now. Check back during our opening hours."}
        </p>
        <button className="btn">Order</button>
      </div>
    </footer>
  );
}
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
