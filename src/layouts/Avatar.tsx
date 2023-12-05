import { Avatar, Dropdown } from "antd";
import { AiOutlineUser } from "react-icons/ai";

export const UserAvatar = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <p style={{ margin: 0, marginRight: "8px", color: "white" }}>
        Nombre de usuario
      </p>

      <Dropdown
        trigger={["click"]}
        placement="bottomRight"
        menu={{
          items: [
            {
              key: "2",
              label: <span>Editar perfil</span>,
              onClick: () => {
                window.location.replace("/auth/profile");
              },
            },
            {
              key: "1",
              label: <span>Cerrar sesión</span>,
              onClick: () => {
                try {
                  //borrar informacion del usuario, si se trabajara con algun tipo de token o credenciales
                } catch (err) {
                  console.log(err);
                } finally {
                  //devolver al login
                }
                console.log("cierra todo");
              },
            },
          ],
        }}
      >
        <Avatar
          style={{ backgroundColor: "#87d068", cursor: "pointer" }}
          icon={<AiOutlineUser />}
        />
      </Dropdown>
    </div>
  );
};
