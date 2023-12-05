import React from "react";

import styled from "styled-components";

const OrdersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
`;

const OrderContainer: React.FC = () => {
  return (
    <div style={{ background: "#333333" }}>
      <OrdersWrapper>
        <footer
          style={{ color: "white", textAlign: "center", fontSize: "0.8em" }}
        >
          <p>
            &copy;2023 Kitchen Display System. Todos los derechos reservados.
          </p>
          <p>Contacto: (123) 456-7890</p>
        </footer>
      </OrdersWrapper>
    </div>
  );
};

export default OrderContainer;
