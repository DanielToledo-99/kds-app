import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Drawer, Select, Space, Typography } from "antd";
import OrderItem from "./OrderItem";
import { Order, RootState } from "../types/types";
import { CreateForm } from "../layouts/CreateForm";
import OrderContainer from "../features/OrderContainer";
import { Outlet } from "react-router-dom";
const { Text } = Typography;
const OrderList: React.FC = () => {
  const allOrders = useSelector((state: RootState) => state.orders.orders);
  const [filter, setFilter] = useState("all");
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const [order, setOrder] = useState<null | Order>(null);

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleAddClick = () => {
    setOrder(null);
    setIsDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setOrder(null);
    setIsDrawerVisible(false);
  };

  const filteredOrders = allOrders.filter((order: Order) => {
    if (filter === "finish") {
      return order.status === "finish";
    } else if (filter === "wait") {
      return order.status === "wait";
    } else if (filter === "error") {
      return order.status === "error";
    } else {
      return true;
    }
  });

  return (
    <div style={{ background: "#1f4457" }}>
      <Text style={{ color: "#f2f2f2", marginLeft: "10%", fontSize: "30px" }}>
        Listado de ordenes
      </Text>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "10%",
        }}
      >
        <div>
          <Button
            type="primary"
            style={{ backgroundColor: "#1f6b57", borderColor: "#1f6b57" }}
            onClick={handleAddClick}
          >
            Añadir Orden
          </Button>
          <Button style={{ marginLeft: "10px" }} type="primary">
            Ver Cocina
          </Button>
        </div>
        <Drawer
          title={`Nueva Orden`}
          open={isDrawerVisible}
          onClose={handleDrawerClose}
          width={450}
        >
          {isDrawerVisible && (
            <CreateForm
              order={order}
              setOrder={setOrder}
              onClose={handleDrawerClose}
            />
          )}
        </Drawer>

        <div>
          <Text style={{ color: "#f2f2f2" }}>Estado de pedido: </Text>
          <Space wrap style={{ marginRight: "183px" }}>
            <Select
              onChange={handleFilterChange}
              defaultValue=""
              style={{ width: 120 }}
              options={[
                { value: "finish", label: "Completado" },
                { value: "wait", label: "Pendientes" },
                { value: "error", label: "Canceladas" },
              ]}
            />
          </Space>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "0px",
        }}
      >
        {filteredOrders.length === 0 ? (
          <p
            style={{
              color: "#f2f2f2",
              textAlign: "center",
            }}
          >
            No hay órdenes
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: "0px",
            }}
          >
            {filteredOrders.map((order: Order) => (
              <OrderItem
                key={order.id}
                id={order.id}
                items={order.items}
                status={order.status}
              />
            ))}
          </div>
        )}
      </div>

      {filteredOrders.length > 3 ? (
        <div style={{ marginTop: "40px" }}>
          <OrderContainer />
        </div>
      ) : filteredOrders.length > 0 ? (
        <div style={{ marginTop: "334px" }}>
          <OrderContainer />
        </div>
      ) : (
        <div style={{ marginTop: "581px" }}>
          <OrderContainer />
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default OrderList;
