import React from "react";
import styled from "styled-components";
import { Button, Steps } from "antd";
const OrderItemWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  display: inline-block;
  border-radius: 10px;
  background: #ffffff;
`;

interface OrderItemProps {
  id: string;
  items: string[];
}

const OrderItem: React.FC<OrderItemProps> = ({ id, items }) => {
  const handleViewDetails = () => {
    console.log(`Detalles de la orden #${id}`);
  };

  const handleMarkCompleted = () => {
    console.log(`Orden #${id} marcada como completada`);
  };

  return (
    <OrderItemWrapper>
      <h3>Order #{id}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <hr
        style={{
          border: "1px solid rgba(128, 128, 128, 0.3)",
          margin: "10px 0",
        }}
      />
      <h4>Estado en Cocina:</h4>
      <Steps
        current={1}
        status="wait"
        items={[
          {
            title: "Orden recibida",
          },
          {
            title: "En preparacion",
          },
          {
            title: "Entregada",
          },
        ]}
      />
      <hr
        style={{
          border: "1px solid rgba(128, 128, 128, 0.3)",
          margin: "10px 0",
        }}
      />
      <Button
        type="primary"
        style={{ marginRight: "10px", marginTop: "12px" }}
        onClick={handleViewDetails}
      >
        Ver Detalles
      </Button>
      <Button
        type="primary"
        style={{ backgroundColor: "green", borderColor: "green" }}
        onClick={() => handleMarkCompleted()}
      >
        Completada
      </Button>
    </OrderItemWrapper>
  );
};

export default OrderItem;
