import { createContext, useState } from 'react';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [showSearch, setShowSearch] = useState(false);

  const getCartCount = () => {
    // Placeholder for cart count logic
    return 0;
  };

  const value = {
    setShowSearch,
    getCartCount,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
