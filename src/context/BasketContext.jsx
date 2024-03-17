import { createContext, useEffect, useState } from "react";
import { json } from "react-router-dom";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(savedBasket);
  }, []);

  const addToBasket = (product) => {
    // basket.map((item) => {
    //   if (item.id === product.id) {
    //     let updateBasket = [{ ...basket, count: item.count + 1 }];

    //     setBasket(updateBasket);
    //     localStorage.setItem("basket", JSON.stringify(updateBasket));
    //     updateBasket=[]
    //   } else {
    //     let updateBasket = [...basket, product];
    //     setBasket(updateBasket);
    //     localStorage.setItem("basket", JSON.stringify(updateBasket));
    //     updateBasket=[]
    //   }

    const existItemIndex = basket.findIndex(
      (basketItem) => basketItem.id === product.id
    );
    if (existItemIndex !== -1) {
      basket[existItemIndex].count += 1;
      localStorage.setItem("basket", JSON.stringify(basket));
    } else {
      const updateBasket = [...basket, product];
      setBasket(updateBasket);
      localStorage.setItem("basket", JSON.stringify(updateBasket));
    }
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContext;
