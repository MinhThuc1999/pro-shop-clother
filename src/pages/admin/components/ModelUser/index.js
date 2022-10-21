import React from "react";
import "./modelUser.scss";
import { Modal } from "antd";
import { Button, Form, Input, InputNumber, Radio } from "antd";

function ModelUser({ modelAdd, toggle, createUser }) {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      password: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const onFinish = (values) => {
    createUser(values.user);
  };
  return (
    <div>
      <Modal title="Add User" open={modelAdd} onOk={toggle} onCancel={toggle}>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "username"]}
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "password"]}
            label="Password"
            rules={[
              {
                required: true,
                type: "password",
                message: "Please input your Password!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["user", "address"]} label="Address">
            <Input />
          </Form.Item>
          <Form.Item name={["user", "isAdmin"]} label="IsAdmin">
            <Radio.Group>
              <Radio value="false"> USER </Radio>
              <Radio value="true"> ADMIN </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ModelUser;
