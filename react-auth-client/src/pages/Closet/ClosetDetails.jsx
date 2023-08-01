import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Button, Row, Col } from "antd";
import AddNewItem from "../../components/Closet/AddNewItem";
import ItemCard from "../../components/Closet/ItemCard";
import closetService from "../../services/closet.service";

const { Title, Text } = Typography;

function ClosetDetails(props) {
  const [closet, setCloset] = useState([]);
  const { closetId } = useParams();

  const getCloset = () => {
    closetService
      .getOneCloset(closetId)
      .then((response) => {
        const oneCloset = response.data;
        setCloset(oneCloset);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCloset();
  }, []);

  return (
    <div className="ClosetDetails" style={{ padding: "24px" }}>
      <div
        style={{
          marginBottom: "24px",
          marginTop: "-200px",
          marginLeft: "200px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AddNewItem refreshCloset={getCloset} closetId={closetId} />
        </div>
      </div>

      {closet && <></>}

      <div
        style={{
          marginBottom: "24px",
          marginLeft: "200px",
          marginTop: "-190px",
        }}
      >
        {closet && (
          <>
            <Title>{closet.title}</Title>
            <Text>{closet.description}</Text>
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: "24px",
            marginLeft: "48%",
            position: "center",
          }}
        >
          <div>
            <Link to="/closets">
              <Button type="primary">Back to closets</Button>
            </Link>
          </div>

          <div>
            <Link to={`/closets/edit/${closetId}`}>
              <Button>Edit Closet</Button>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "200px" }}>
        {closet.items &&
          closet.items.map((item) => (
            <div
              key={item._id}
              style={{
                flexBasis: "280px",
                margin: "8px",
                marginLeft: "200px",
                marginTop: "-200px",
              }}
            >
              <ItemCard {...item} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default ClosetDetails;
