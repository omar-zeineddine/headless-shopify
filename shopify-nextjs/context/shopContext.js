import { createContext, useState, useEffect } from "react";
import { createCheckout, updateCheckout } from "../lib/shopify";

const CartContext = createContext();

export default function ShopProvider({ children }) {
  // cart and checkout initial states
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    if (localStorage.checkout_id) {
      // if checkout id exists, fetch it
      const cartObject = JSON.parse(localStorage.checkout_id);

      if (cartObject[0].id) {
        setCart([cartObject[0]]);
      } else if (cartObject[0].length > 0) {
        setCart(...[cartObject[0]]);
      }

      setCheckoutId(cartObject[1].id);
      setCheckoutUrl(cartObject[1].webUrl);
    }
  }, []);

  async function addToCart(newItem) {
    // const newItem = { ...addedItem };
    // console.log(newItem);
    setCartOpen(true);

    if (cart.length === 0) {
      setCart([newItem]);
      // console.log(newItem);

      const checkout = await createCheckout(
        newItem.id,
        newItem.variantQuantity
      );

      setCheckoutId(checkout.id);
      setCheckoutUrl(checkout.webUrl);

      localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]));
    } else {
      let newCart = [...cart];

      cart.map((item) => {
        // check if added item already exists in cart, and add one if condition is met
        if (item.id === newItem.id) {
          item.variantQuantity++;
          newCart = [...cart];
        } else {
          newCart = [...cart, newItem];
        }
      });

      // update cart state and add new checkout object
      setCart(newCart);

      const newCheckout = await updateCheckout(checkoutId, newCart);
      localStorage.setItem(
        "checkout_id",
        JSON.stringify([newCart, newCheckout])
      );
    }
  }

  async function removeCartItem(itemToRemove) {
    const updatedCart = cart.filter((item) => item.id !== itemToRemove);
    setCartLoading(true);

    setCart(updatedCart);

    const newCheckout = await updateCheckout(checkoutId, updatedCart);

    localStorage.setItem(
      "checkout_id",
      JSON.stringify([updatedCart, newCheckout])
    );
    setCartLoading(false);

    // close cart if no items
    if (cart.length === 1) {
      setCartOpen(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        checkoutUrl,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const ShopConsumer = CartContext.Consumer;

export { ShopConsumer, CartContext };
