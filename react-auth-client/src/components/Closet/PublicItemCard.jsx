import React from "react";
import { Card } from "antd";

const PublicItemCard = ({ item }) => {
  return (
    <Card
      key={item._id}
      title={item.title}
      style={{ width: 300, margin: "0 16px 16px 220px" }}
    >
      <img src={item.image} alt={item.title} style={{ width: "100%" }} />
      <p>{item.description}</p>
      {/* Render other item details as needed */}
    </Card>
  );
};

export default PublicItemCard;