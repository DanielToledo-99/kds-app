import React from "react";
import OrderList from "./compoments/OrderList";
import OrderContainer from "./features/OrderContainer";

const App: React.FC = () => {
  return (
    <div style={{ background: "#1f4457", height: "100%" }}>
      <h1>Kitchen Display System</h1>
      <OrderList />
      <OrderContainer />
    </div>
  );
};

export default App;
