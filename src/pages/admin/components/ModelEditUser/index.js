import React from "react";
import { Modal } from "antd";
import { Button, Form, Input, Radio } from "antd";
function ModelEditUser({ toggleHandleModel, currentUser, editUser }) {
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
    editUser(values.user);
  };
  console.log(currentUser);
  return (
    <div>
      <Modal
        title="Edit User"
        open={true}
        onOk={toggleHandleModel}
        onCancel={toggleHandleModel}
      >
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
            initialValue={currentUser.username}
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
            initialValue={currentUser.email}
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
            initialValue={currentUser.password}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "address"]}
            label="Address"
            initialValue={currentUser.address}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "isAdmin"]}
            label="IsAdmin"
            initialValue={currentUser.isAdmin}
          >
            <Radio.Group>
              <Radio value="false"> USER </Radio>
              <Radio value="true"> ADMIN </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ModelEditUser;
