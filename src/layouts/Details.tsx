import { Dispatch, SetStateAction } from "react";
import { Order } from "../types/types";
import { Form, Input } from "antd";
import { NOTIFICATION } from "../const/notification";
import { toast } from "react-toastify";

export const DetailsForm: React.FC<{
  order: Order | null;
  setOrder: Dispatch<SetStateAction<Order | null>>;
  onClose: () => void;
}> = ({ order, setOrder, onClose }) => {
  const [form] = Form.useForm();
  const onFinish = async (values: Order) => {
    try {
      //await details(oder?.id) aqui se podria hacer la consulta al endpont de la api para obtener los datos de la orden
      onClose();
    } catch (err: any) {
      toast.error(err.message, NOTIFICATION.error);
    }
  };

  return (
    <Form
      form={form}
      name="detailsOrder"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 90 }}
    >
      <Form.Item name="id" label="ID" initialValue={order ? order.id : ""}>
        <Input disabled />
      </Form.Item>
      <Form.Item
        name="plato"
        label="Plato"
        initialValue={order ? order.items : ""}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="status"
        label="Estato"
        initialValue={order ? order.status : ""}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};
