import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import { RootState } from "../types/types";
import { addOrder } from "../features/orderSlice";
import { Button, Select, Space } from "antd";
import OrderContainer from "../features/OrderContainer";

const OrderList: React.FC = () => {
  const allOrders = useSelector((state: RootState) => state.orders.orders);
  const [filter, setFilter] = useState("all");

  const dispatch = useDispatch();

  const handleAddOrder = () => {
    const newOrder = {
      id: Date.now().toString(),
      items: ["Dish 1", "Dish 2"],
    };

    dispatch(addOrder(newOrder));
  };

  const filteredOrders = allOrders.filter((order) => {
    if (filter === "completed") {
      return order.status === "completed";
    } else if (filter === "pending" || filter === "process") {
      return order.status !== "completed";
    } else {
      return true;
    }
  });

  return (
    <div style={{ background: "#1f4457", height: "75vh" }}>
      <h2 style={{ color: "#f2f2f2", marginLeft: "10%" }}>
        Listado de ordenes
      </h2>
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
            onClick={handleAddOrder}
          >
            Añadir Orden
          </Button>
          <Button style={{ marginLeft: "10px" }} type="primary">
            Ver Cocina
          </Button>
        </div>
        <div>
          <label style={{ color: "#f2f2f2" }}>Estado de pedido: </label>
          <Space wrap style={{ marginRight: "183px" }}>
            <Select
              defaultValue="completado"
              style={{ width: 120 }}
              options={[
                { value: "completado", label: "Completado" },
                { value: "pendiente", label: "Pendientes" },
                { value: "proceso", label: "Proceso" },
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
          marginTop: "8%",
        }}
      >
        {filteredOrders.length === 0 ? (
          <p style={{ color: "#f2f2f2", textAlign: "center" }}>
            No hay órdenes
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {filteredOrders.map((order, index) => (
              <React.Fragment key={order.id as string}>
                <OrderItem id={order.id as string} items={order.items} />
                {index % 3 === 2 && (
                  <div style={{ width: "100%", height: "20px" }}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
      <OrderContainer />
    </div>
  );
};

export default OrderList;
