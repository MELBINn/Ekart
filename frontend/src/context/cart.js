import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { Url } from "../url";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const getAllCart = async () => {
    try {
      const { data } = await axios.get(Url+"/api/v1/cart/get-cart");
      if (data?.success) {
        //console.log(data.productCart)
        setCart(data.productCart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCart()
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };