import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Drawer, Steps, Table } from "antd";
import { Order, OrderStatus } from "../types/types";
import { Outlet } from "react-router-dom";
import { DetailsForm } from "../layouts/Details";
import { Typography } from "antd";
const { Text } = Typography;
const OrderItemWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  display: inline-block;
  border-radius: 10px;
  background: #ffffff;
  height: 480px;
`;

const StyledTable = styled(Table)`
  max-height: 300px;
  overflow: auto;
`;

const OrderItem: React.FC<Order> = ({ id, items, status }) => {
  const [order, setOrder] = useState<null | Order>(null);
  const [isDrawerVisibles, setIsDrawerVisibles] = useState(false);
  const handleDrawerClose = () => {
    setOrder(null);
    setIsDrawerVisibles(false);
  };
  const [estado, setEstado] = useState<String>("");

  const [localStatus, setLocalStatus] = useState<OrderStatus>(status);
  const [numberStatus, setNumberStatus] = useState<number>();
  const handleMarkCompleted = () => {
    if (localStatus !== "error") {
      setLocalStatus("finish");
      setNumberStatus(3);
      console.log(`Orden #${id} marcada como completada`);
    } else {
      console.log(
        "No se puede marcar como completada, el estado actual es 'error'"
      );
    }
  };

  const handleMarkCancel = () => {
    setLocalStatus("error");
    setNumberStatus(0);
  };
  const dataSource = items.map((item) => ({
    plato: item.nombre,
    cantidad: item.cantidad,
    costo: "s/." + item.costo,
    fecha: item.fecha ? item.fecha.toLocaleString() : "",
  }));
  const handleAddClick = (record: Order) => {
    setOrder(record);
    setIsDrawerVisibles(true);
  };
  const columns = [
    {
      title: "Plato",
      dataIndex: "plato",
      key: "plato",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
    },
    {
      title: "Precio",
      dataIndex: "costo",
      key: "costo",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },
  ];

  const paginationConfig = {
    pageSize: 2,
  };
  useEffect(() => {
    if (localStatus === "process" || localStatus === "wait") {
      setEstado("Pendiente");
    } else if (localStatus === "finish") {
      setEstado("Entregado");
    } else {
      setEstado("Cancelado");
    }
  }, [localStatus]);
  return (
    <OrderItemWrapper>
      <div style={{ display: "flex", alignItems: "center", margin: "12px" }}>
        <Text strong style={{ marginLeft: "10px", fontSize: "25px" }}>
          Orden #{id}
        </Text>
        <div style={{ display: "inline-block", marginLeft: "180px" }}>
          {localStatus === "finish" ? (
            <Text type="success">Estado: {estado}</Text>
          ) : localStatus === "error" ? (
            <Text type="danger">Estado: {estado}</Text>
          ) : (
            <Text type="warning">Estado: {estado}</Text>
          )}
        </div>
      </div>
      <div>
        <div>
          <StyledTable
            dataSource={dataSource}
            columns={columns}
            pagination={paginationConfig}
          />
        </div>
      </div>
      <hr
        style={{
          border: "1px solid rgba(128, 128, 128, 0.3)",
          margin: "10px 0",
        }}
      />
      <div>
        <h4>Estado en Cocina:</h4>
        <Steps
          current={numberStatus}
          status={localStatus}
          items={[
            {
              title: "Orden recibida",
            },
            {
              title: "En preparacion",
            },
            {
              title: "Pedido Listo",
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
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Button
            type="primary"
            style={{ marginRight: "10px" }}
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              handleAddClick(e as any)
            }
          >
            Ver Detalles de Pedido
          </Button>
          <Button
            type="primary"
            style={{
              backgroundColor: "green",
              borderColor: "green",
              marginRight: "10px",
            }}
            onClick={() => handleMarkCompleted()}
          >
            Pedido Entregado
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "red", borderColor: "red" }}
            onClick={() => handleMarkCancel()}
          >
            Cancelar Pedido
          </Button>
        </div>
        <Drawer
          title={`Detalles de la orden`}
          open={isDrawerVisibles}
          onClose={handleDrawerClose}
          width={450}
        >
          {isDrawerVisibles && (
            <DetailsForm
              order={order}
              setOrder={setOrder}
              onClose={handleDrawerClose}
            />
          )}
        </Drawer>
      </div>
      <Outlet />
    </OrderItemWrapper>
  );
};

export default OrderItem;
