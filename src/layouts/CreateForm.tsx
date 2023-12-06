import React, { Dispatch, SetStateAction, useState } from "react";
import { Form, Input, Button, InputNumber, Divider } from "antd";
import { toast } from "react-toastify";
import { NOTIFICATION } from "../const/notification";
import { Order, OrderItems } from "../types/types";
import { addOrder } from "../features/orderSlice";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const useCustomDispatch = () => {
  const dispatch = useDispatch();
  return dispatch;
};

export const CreateForm: React.FC<{
  order: Order | null;
  setOrder: Dispatch<SetStateAction<Order | null>>;
  onClose: () => void;
}> = ({ onClose, order, setOrder }) => {
  const [form] = Form.useForm();
  const [numPlates, setNumPlates] = useState<number>(1);
  const dispatch = useCustomDispatch();

  const renderDishForm = (index: number) => (
    <div key={index}>
      <Form.Item
        label={`Plato ${index + 1}`}
        name={["items", index, "nombre"]}
        rules={[
          { required: true, message: "Por favor ingresa el nombre del plato" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={`Cantidad`}
        name={["items", index, "cantidad"]}
        rules={[
          { type: "number", min: 1, message: "Ingrese una cantidad válida" },
        ]}
      >
        <InputNumber step={1.0} min={1.0} placeholder="1" className="w-36" />
      </Form.Item>
      <Form.Item
        label={`Precio`}
        name={["items", index, "costo"]}
        rules={[
          { type: "number", min: 1, message: "Ingrese una cantidad válida" },
        ]}
      >
        <InputNumber
          step={1.0}
          min={1.0}
          prefix="S/ "
          precision={2}
          placeholder="1.00"
          className="w-36"
        />
      </Form.Item>
      <Form.Item
        label={`Observaciones`}
        name={["items", index, "observaciones"]}
      >
        <Input />
      </Form.Item>
      {index < numPlates - 1 && <Divider />}
    </div>
  );

  const onFinish = async (values: Order) => {
    const newOrderItems: OrderItems[] = values.items.map((item: any) => {
      const currentDate = new Date();
      const { fecha, cantidad, costo, ...rest } = item;
      const newCosto = cantidad * costo;
      return {
        ...rest,
        cantidad: cantidad,
        costo: newCosto,
        fecha: currentDate,
      } as OrderItems;
    });

    try {
      const newOrder: Order = {
        id: Date.now().toString(),
        status: "wait",
        items: newOrderItems,
      };

      dispatch(addOrder(newOrder));

      const idNot = toast.loading("Creando orden...", NOTIFICATION.loading);
      setTimeout(() => {
        toast.update(idNot, {
          render: "Orden creada",
          ...NOTIFICATION.updateLoading,
        });
        form.resetFields();
        onClose();
      }, 1000);
    } catch (err: any) {
      toast.error(err.message, NOTIFICATION.error);
    }
  };

  const handleNumPlatesChange = (value: number | null) => {
    setNumPlates(value || 1);
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 90 }}
        initialValues={{
          items: Array.from({ length: numPlates }, () => ({
            nombre: "",
            cantidad: 1,
            observaciones: "",
          })),
        }}
      >
        <Form.Item
          label="Número de Platos"
          name="numPlates"
          initialValue={1}
          rules={[
            {
              required: true,
              message: "Por favor ingrese el número de platos",
            },
          ]}
        >
          <InputNumber min={1} onChange={handleNumPlatesChange} />
        </Form.Item>
        {[...Array(numPlates)].map((_, index) => renderDishForm(index))}

        <Form.Item className="text-right" style={{ marginLeft: "290px" }}>
          <Button type="primary" htmlType="submit">
            Crear Orden
          </Button>
        </Form.Item>
      </Form>
      <Outlet />
    </div>
  );
};
