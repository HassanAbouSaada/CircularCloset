import { useState, useContext } from "react";
import { Form, Input, Button, Alert, Carousel } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "./../services/auth.service";
import TextSlideshow from "../components/TextSlideshow";

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const { storeToken, authenticateUser, setIsLoggedIn } =
    useContext(AuthContext);
  const [form] = Form.useForm();

  const handleLoginSubmit = (values) => {
    const { email, password } = values;
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div
      style={{
        position: "relative",
        minWidth: "100vw",
        minHeight: "100vh",
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
        <source
          src="https://res.cloudinary.com/doewm9ocg/video/upload/v1690454483/pexels-mart-production-7679842_2160p_d0i5nf.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      {/* Place TextSlideshow component here */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 9999,
        }}
      >
        <TextSlideshow /> {/* Display the TextSlideshow */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Form
          form={form}
          onFinish={handleLoginSubmit}
          layout="vertical"
          style={{ width: "400px",   position: "absolute",
          top: "15%",
          left: "65%", }}
        >
          <h1>Login</h1>

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

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>

          <Form.Item>
            <p style={{ textAlign: "center" }}>
              Don't have an account yet? <Link to={"/signup"}>Sign Up</Link>
            </p>
          </Form.Item>
        </Form>

        {errorMessage && (
          <Alert message={errorMessage} type="error" showIcon closable />
        )}
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 9999,
        }}
      ></div>{" "}
    </div>
  );
}

export default LoginPage;
