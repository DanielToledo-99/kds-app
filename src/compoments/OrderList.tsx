import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import {  Order, RootState} from "../types/types";
import { addOrder } from "../features/orderSlice";
import { Button, Select, Space } from "antd";
import OrderContainer from "../features/OrderContainer";
import { format } from 'date-fns';


const OrderList: React.FC = () => {
  const allOrders = useSelector((state: RootState) => state.orders.orders);
  const [filter, setFilter] = useState("all");

  const dispatch = useDispatch();
  const handleAddOrder = () => {
    const newOrder: Order = {
      id: Date.now().toString(),
      status: "pending",
      items: [
        { nombre: "Dish 1", costo: 10, fecha: new Date(), cantidad : 1 },
      ],
    };
    dispatch(addOrder(newOrder));
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };
  const filteredOrders = allOrders.filter((order: Order) => {
    if (filter === "completed") {
      return order.status === "completed";
    } else if (filter === "pending") {
      return order.status === "pending";
    } else if (filter === "process") {
      return order.status === "process";
    } else {
      return true;
    }
  });
  return (
    <div style={{ background: "#1f4457"}}>
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
        <div >
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
             onChange={handleFilterChange}
              defaultValue=""
              style={{ width: 120 }}
              options={[
                { value: "completed", label: "Completado" },
                { value: "pending", label: "Pendientes" },
                { value: "process", label: "Proceso" },
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
          marginTop: "0px"
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
              marginTop:"0px"
            }}
          >
{filteredOrders.map((order: Order, index: number) => (
  <React.Fragment key={order.id}>
    {order.items.map((item,itemIndex) => (
      <OrderItem
      key={`${order.id}-${itemIndex}`}
        id={order.id}
        nombre={item.nombre}
        costo={item.costo}
        fecha={new Date(item.fecha)}
        cantidad ={item.cantidad}
      />
    ))}
                {index % 3 === 2 && (
                  <div style={{ width: "100%", height: "20px" }}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
      
      {filteredOrders.length > 3 ? (
    <div style={{ marginTop: '40px' }}>
      <OrderContainer />
    </div>
  ) : (
    filteredOrders.length > 0 ? (
      <div style={{ marginTop: '334px' }}>
        <OrderContainer />
      </div>
    ) : (
      <div style={{ marginTop: '581px' }}>
        <OrderContainer />
      </div>
    )
  )}
      
    </div>
  );
};

export default OrderList;

