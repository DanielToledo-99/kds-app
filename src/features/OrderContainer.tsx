import React from "react";
import styled from "styled-components";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 10vh; /* Asegura que el contenedor ocupe al menos la altura de la ventana gráfica */
  background: #333333;
`;

const OrdersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
`;

const OrderContainer: React.FC = () => {
  return (
    <CenteredContainer>
      <OrdersWrapper>
        <footer
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "0.8em",
          }}
        >
          <p>
            &copy;2023 Kitchen Display System. Todos los derechos reservados.
          </p>
          <p>Contacto: (123) 456-7890</p>
        </footer>
      </OrdersWrapper>
    </CenteredContainer>
  );
};

export default OrderContainer;
