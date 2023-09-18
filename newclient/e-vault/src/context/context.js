import { createContext, useContext, useState } from "react";

const EVaultContext = createContext(null);

export const useVault = () => useContext(EVaultContext);

export const EVaultProvider = (props) => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  return (
    <EVaultContext.Provider
      value={{
        account,
        setAccount,
        contract,
        setContract,
        provider,
        setProvider,
      }}
    >
      {props.children}
    </EVaultContext.Provider>
  );
};
