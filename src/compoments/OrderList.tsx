import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import { RootState } from "../types/types";
import { addOrder } from "../features/orderSlice";
import { Button, Select, Space } from "antd";

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
  const filteredOrders =
    filter === "completed"
      ? allOrders.filter((order) => order.completed)
      : filter === "pending"
      ? allOrders.filter((order) => !order.completed)
      : allOrders;

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2 style={{ color: "white" }}>Listado de ordenes</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button
            type="primary"
            style={{ backgroundColor: "#1f6b57", borderColor: "#1f6b57" }}
            onClick={handleAddOrder}
          >
            Añadir Orden
          </Button>
        </div>
        <div>
          <label>Estado de pedido: </label>
          <Space wrap>
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
      <div></div>
      <div>
        {" "}
        {filteredOrders.map((order) => (
          <OrderItem
            key={order.id as string}
            id={order.id as string}
            items={order.items}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
