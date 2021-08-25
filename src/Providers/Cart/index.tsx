import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface ICartProps {
  children: ReactNode;
}

interface IProducts {
  name: string;
  image_url: string;
  price: number;
  description: string;
  id: number;
  priceFormatted: string;
}

interface ICartContext {
  addToCart: (product: IProducts) => void;
  cart: [];
}

const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: ICartProps) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "null") || []
  );

  const addToCart = (product: IProducts) => {
    setCart([...cart, product]);
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
