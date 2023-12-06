import React from "react";
import styled from "styled-components";
import { Button, Steps, Table } from "antd";
const OrderItemWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  display: inline-block;
  border-radius: 10px;
  background: #ffffff;
`;


interface Item {
  nombre: string;
  costo: number;
  fecha: Date;
  cantidad:number;
}

interface OrderItemProps {
  id: string;
  nombre: string;
  costo: number;
  cantidad:number;
  fecha: Date;
}

const OrderItem: React.FC<OrderItemProps> = ({ id, nombre, costo, fecha,cantidad }) => {
  console.log(fecha)
  const handleViewDetails = () => {
    console.log(`Detalles de la orden #${id}`);
  };

  const handleMarkCompleted = () => {
    console.log(`Orden #${id} marcada como completada`);
  };


  const dataSource = [
    {
      
      plato: nombre,
      cantidad: cantidad,
      costo: 's/.'+ costo,
      fecha:fecha.toLocaleString()
    },
  ]
  const columns =[
    {
      title: 'Plato', 
      dataIndex: 'plato',
      key: 'plato',
    },
    {
      title: 'Cantidad', 
      dataIndex: 'cantidad',
      key: 'cantidad',
    },
    {
      title: 'Precio', 
      dataIndex: 'costo',
      key: 'costo',
    },
    {
      title: 'Fecha', 
      dataIndex: 'fecha',
      key: 'fecha',
    }

  ]


  return (
    <OrderItemWrapper>
      <h3>Order #{id}</h3>
      <div>

      <div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
     
     
    </div>
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
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}
      >
        <Button
          type="primary"
          style={{ marginRight: "10px" }}
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
      </div>
    </OrderItemWrapper>
  );
};

export default OrderItem;
