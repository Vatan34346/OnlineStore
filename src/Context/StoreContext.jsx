import React  from "react";

const StoreContext = React.createContext({
  currency: "USD",
  setCurrency: () => {},
  cartItems:[],
  setCartItems:()=>{},
});


export default StoreContext;
