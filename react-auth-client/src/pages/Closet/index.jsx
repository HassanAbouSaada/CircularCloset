import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import closetService from "../../services/closet.service";
import ClosetCard from "../../components/Closet/ClosetCard";
import { ClosetContext } from "../../context/ClosetContext";
import { AuthContext } from "../../context/auth.context";
import { Button, Layout, Avatar, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const API_URL = "http://localhost:5005";

const { Content } = Layout;

export default function Closet() {
  const { closets } = useContext(ClosetContext);
  const { sidebarOpen, user } = useContext(AuthContext);

  const [allClosets, setAllClosets] = useState([]);
  const [userClosets, setUserClosets] = useState([]);

  const getAllClosets = () => {
    closetService
      .getAllClosets()
      .then((response) => {
        setUserClosets(response.data.closets);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllClosets();
  }, [user]);

  return (
    <Layout style={{ padding: "16px", marginLeft: "200px", marginTop: "5px" }}>
      <Content>
        <div className="closet-container">
          <h1>My Closet</h1>
          <Link to="/closet/new">
            <Button type="primary" icon={<PlusOutlined />}>
              Create New Compartment
            </Button>
          </Link>
          <div className="closet-card-container">
            <Row gutter={[16, 16]}>
              {userClosets.map((closet) => (
                <Col key={closet._id} xs={24} sm={12} md={8} lg={6} xl={4}>
                  <div className="closet-card">
                    <ClosetCard closet={closet} />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Content>
    </Layout>
  );
}