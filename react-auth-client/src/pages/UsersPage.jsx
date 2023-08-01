import { useState, useEffect } from "react";
import { Row, Col, Layout } from "antd";
import UserCard from "../components/UserCard";
import usersService from "../services/users.service";

const { Content } = Layout;

function UsersPage() {
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    usersService
      .getAllUsers()
      .then((response) => {
        const usersWithPublicItems = response.data.map((user) => {
          return {
            ...user,
            hasPublicItem: hasUserPublicItem(user),
          };
        });
        setUsers(usersWithPublicItems);
      })
      .catch((error) => console.log(error));
  };

  const hasUserPublicItem = (user) => {
    return user.closets.some((closet) => {
      return closet.items.some((item) => item.isPublic);
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout
      style={{
        padding: "16px",
        marginLeft: "200px",
        marginRight: "20px",
        marginTop: "20px",
      }}
    >
      <Content>
        <div className="UsersPage">
          <Row justify="space-between" gutter={[16, 16]}>
            {users.map((user) => (
              <Col key={user._id} xs={24} sm={12} md={8} lg={6} xl={4}>
                <UserCard {...user} />
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
}

export default UsersPage;
