import React from "react";
import OrderList from "./compoments/OrderList";

import { NavigationLayout } from "./layouts/NavigationLayout";

const App: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: 0 }}>
      <NavigationLayout defaultTitle="Kitchen Display System" />
      <OrderList />
    </div>
  );
};

export default App;
