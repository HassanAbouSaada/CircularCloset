import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import closetService from "../../services/closet.service";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

export default function AddNewCloset({ closets, setClosets }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = (values) => {
    const newCloset = {
      ...values,
    };

    closetService
      .createCloset(newCloset)
      .then((response) => {
        console.log("closed created: ", response);

        // Reset the form and navigate
        form.resetFields();
        navigate("/closet");

        // Add the new closet to the closets state
        setClosets((prevState) => [...prevState, response.data]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <h2>Create New Compartment</h2>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Width (cm)"
              name="width"
              rules={[{ required: true, message: "Please enter the width" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Height (cm)"
              name="height"
              rules={[{ required: true, message: "Please enter the height" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: "Please choose a color" }]}
        >
          <Input type="color" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
