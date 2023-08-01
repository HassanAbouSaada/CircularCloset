import React, { useState, useContext } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import itemsService from "../../services/items.service";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

const API_URL = "http://localhost:5005";

function AddItem(props) {
  const [form] = Form.useForm();
  const storedToken = localStorage.getItem("authToken");
  const [image, setImage] = useState("");

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    axios
      .post(`${API_URL}/api/upload`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response", response);
        setImage(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (values) => {
    const { closetId, refreshCloset } = props;
    const requestBody = {
      ...values,
      closetId,
      image,
    };

    console.log("requestedbody", requestBody);

    itemsService
      .createItem(requestBody)
      .then((response) => {
        form.resetFields();
        refreshCloset();
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
      <div className="AddItem">
        <h3>Add New Item</h3>

        <Form form={form} onFinish={handleSubmit}>
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

          <Form.Item
            label="Color"
            name="color"
            rules={[{ required: true, message: "Please enter a color" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Image">
            <Input type="file" onChange={handleFileUpload} />
          </Form.Item>

          <Form.Item
            label="Item Type"
            name="itemType"
            rules={[{ required: true, message: "Please select an item type" }]}
          >
            <select>
              <option value="">Select Item Type</option>
              <option value="Jacket">Jacket</option>
              <option value="Shirt">Shirt</option>
              <option value="Trousers">Trousers</option>
              <option value="Accessories">Accessories</option>
              <option value="Hats">Hats</option>
              <option value="Bags">Bags</option>
              <option value="Dresses">Dresses</option>
              <option value="Skirts">Skirts</option>
              <option value="Other">Other</option>
            </select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Item
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddItem;
