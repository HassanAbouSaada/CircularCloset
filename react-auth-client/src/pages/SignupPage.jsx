import { useState } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import authService from "./../services/auth.service";

function SignupPage() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSignupSubmit = (values) => {
    const { email, password, name } = values;
    const requestBody = { email, password, name };

    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
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
      <video
        autoPlay
        loop
        muted
        style={{
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <source src="https://res.cloudinary.com/doewm9ocg/video/upload/v1690456359/pexels-mart-production-7679419_720p_fzzdwz.mp4" />
        Your browser does not support the video tag.
      </video>
      <Form
        form={form}
        onFinish={handleSignupSubmit}
        layout="vertical"
        style={{ width: "400px", marginLeft: "220px", marginTop: "-200px" }}
      >
        <h2>Create New Account</h2>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter a password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignupPage;
