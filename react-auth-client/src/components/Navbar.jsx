import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Button,
  Layout,
  Avatar,
  Menu,
  Modal,
  Form,
  Input,
  Upload,
  Divider,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useEffect } from "react";
import usersService from "../services/users.service";



const { Sider, Content } = Layout;
const API_URL = "http://localhost:5005";

function Navbar() {
  const { isLoggedIn, user, updateUser, logOutUser, authenticateUser } =
    useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [editProfileForm] = Form.useForm();
  const [image, setImage] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState("");
  const [address, setAddress] = useState("");
  const storedToken = localStorage.getItem("authToken");

  console.log("the weight iiiiii", weight);

  useEffect(() => {
    authenticateUser();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openEditProfileModal = () => {
    setEditProfileModalVisible(true);
    editProfileForm.setFieldsValue({
      name: user.name,
      profilePicture: user.profilePicture,
      height: user.height,
      weight: weight,
      address: user.address,
    });
  };

  const handleEditProfile = (values) => {
    console.log("Received values:", values);
    const updatedUser = {
      ...user,
      name: values.name,
      profilePicture: values.profilePicture,
      height: values.height,
      weight: weight,
      address: values.address,
    };
    console.log("Updated user:", updatedUser);

    // Update the user object in the AuthContext
    // You'll need to implement the updateUser function in the AuthContext
    updateUser(updatedUser);

    setEditProfileModalVisible(false);
  };

  const handleCancelEditProfile = () => {
    setEditProfileModalVisible(false);
  };

  const handleFileUpload = () => {
    const uploadData = new FormData();
    uploadData.append("image", image);
    uploadData.append("height", height);
    uploadData.append("weight", weight);
    uploadData.append("address", address);
    axios
      .put(`${API_URL}/auth/user`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response", response.data.updatedUser);
        handleEditProfile(response.data.updatedUser);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  //console.log(user.profilePicture);
  return (
    <Layout style={{ marginLeft: "vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={sidebarOpen}
        onCollapse={toggleSidebar}
        theme="dark"
        width={200}
        style={{
          position: "fixed",
          zIndex: 1,
          overflow: "auto",
          height: "100vh",
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
            padding: "16px",
          }}
        >
          <img src="https://res.cloudinary.com/doewm9ocg/image/upload/v1690472573/Your_paragraph_text-fotor-bg-remover-20230727174130_lhxssk.png" alt="App Icon" style={{ width: "80%" }} />
          </div>
          
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            padding: "16px",
          }}
        >
          <img src="https://res.cloudinary.com/doewm9ocg/image/upload/v1690477666/circularcloset_ztjcwu.png" alt="App Icon" style={{ width: "100%" }} />

          </div>








        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
              padding: "16px",
            }}
          >
            {isLoggedIn && user && (
              <Avatar
                size={160}
                src={user.profilePicture}
                icon={<UserOutlined />}
                onClick={openEditProfileModal}
              />
            )}
          </div>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            {isLoggedIn && (
              <span style={{ color: "#fff" }}>{user && user.name} </span>
            )}
           
          </div>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            {isLoggedIn && (
              <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to="/userspage">Discover</Link>
              </Menu.Item>
            )}
            {!isLoggedIn && (
              <>
                <Menu.Item key="3" icon={<UserOutlined />}>
                  <Link to="/signup">Sign Up</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<UserOutlined />}>
                  <Link to="/login">Login</Link>
                </Menu.Item>
              </>
            )}
            {isLoggedIn && (
              <Menu.Item key="5" icon={<LogoutOutlined />} onClick={logOutUser}>
                Logout
              </Menu.Item>
            )}
          </Menu>
        </div>
      </Sider>

      {/* start of Edit Profile Modal */}

      <Modal
        title="Edit Profile"
        open={editProfileModalVisible}
        onOk={handleFileUpload}
        onCancel={handleCancelEditProfile}
      >
        <Form onFinish={() => console.log("clicked")}>
          <Form.Item
            name="address"
            label="Address"
            initialValue={user ? user.address : ""}
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input onChange={(e) => setAddress(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="profilePicture"
            label="Profile Picture"
            rules={[
              { required: true, message: "Please upload your profile picture" },
            ]}
          >
            <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </Form.Item>

          <Form.Item
            name="height"
            label="Height"
            initialValue={user ? user.height : ""}
            rules={[{ required: true, message: "Please enter your height" }]}
          >
            <Input onChange={(e) => setHeight(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="weight"
            label="Weight"
            // initialValue={user ? user.weight : ""}
            rules={[{ required: true, message: "Please enter your weight" }]}
          >
            <Input onChange={(e) => setWeight(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
      {/* End of Edit Profile Modal */}

      <Layout style={{ marginLeft: 200 }}>
        <div style={{ padding: "16px" }}>
          <nav>
            <Link to="/">
              <Button>Home</Button>
            </Link>

            {isLoggedIn && (
              <>
                <Link to="/userspage">
                  <Button>Discover</Button>
                </Link>
                <Button onClick={logOutUser}>Logout</Button>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </Layout>
    </Layout>
  );
}

export default Navbar;
