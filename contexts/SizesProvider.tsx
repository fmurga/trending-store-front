"use client";
import { createContext, useState } from "react";

export const SizesContext = createContext([]);

const SizesProvider = ({ children }: any) => {
  const [sharedSize, setSharedSize] = useState<any>(null);

  const getSharedSize = () => {
    return sharedSize;
  };

  const setSharedSelectedSize = (size: string) => {
    setSharedSize(size);
  };

  return (
    <SizesContext.Provider
      value={{
        //@ts-ignore
        setSharedSize,
        sharedSize,
        getSharedSize,
        setSharedSelectedSize,
      }}
    >
      {children}
    </SizesContext.Provider>
  );
};

export default SizesProvider;
