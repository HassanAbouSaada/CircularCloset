import { useState, createContext } from "react";

const ClosetContext = createContext();

function ClosetProvider(props) {
  const [closets, setClosets] = useState([]);

  return (
    <ClosetContext.Provider
      value={{
        closets,
        setClosets
      }}
    >
      {props.children}
    </ClosetContext.Provider>
  );
}

export { ClosetProvider, ClosetContext };
