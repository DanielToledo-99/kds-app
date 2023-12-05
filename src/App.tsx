import React from "react";
import OrderList from "./compoments/OrderList";

import { NavigationLayout } from "./layouts/NavigationLayout";
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", margin: 0 }}>
        <NavigationLayout defaultTitle="Kitchen Display System" />
        <OrderList />
      </div>
    </Router>
  );
};

export default App;
