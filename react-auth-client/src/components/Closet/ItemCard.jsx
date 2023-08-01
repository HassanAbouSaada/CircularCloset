import React, { useEffect, useState, useRef } from "react";
import { Card, Typography } from "antd";
import itemsService from "../../services/items.service";

const { Title, Paragraph } = Typography;

function ItemCard({
  _id,
  title,
  description,
  color,
  enum: itemType,
  image,
  isPublic,
}) {
  const [isPublicState, setIsPublicState] = useState(isPublic);
  const toggleIsPublic = (e) => {
    setIsPublicState(e.target.checked);
  };

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    itemsService
      .updateItem(_id, { isPublic: isPublicState })
      .then((resp) => console.log(resp));
  }, [isPublicState]);

  console.log(isPublicState);
  return (
    <Card className="ItemCard" style={{ width: "300px" }}>
      <div className="image-container">
        <img src={image} alt="" className="card-image" />
      </div>
      <Title level={3} style={{ fontSize: "16px", color: "gray" }}>
        {title}
      </Title>
      <Title level={4} style={{ fontSize: "14px", color: "gray" }}>
        Description:
      </Title>
      <Paragraph style={{ fontSize: "12px", color: "gray" }}>
        {description}
      </Paragraph>
      <Title level={4} style={{ fontSize: "14px", color: "gray" }}>
        Color:
      </Title>
      <Paragraph style={{ fontSize: "12px", color: "gray" }}>{color}</Paragraph>
      <Title level={4} style={{ fontSize: "14px", color: "gray" }}>
        Type:
      </Title>
      <Paragraph style={{ fontSize: "12px", color: "gray" }}>
        {itemType}
      </Paragraph>
      <label style={{ fontSize: "20px", color: "green" }}> {isPublicState ? "Un-Donate" : "Donate 🌱"} </label>
      <input
        onChange={toggleIsPublic}
        defaultChecked={isPublicState}
        type="checkbox"
        id="item-available"
      />
    </Card>
  );
}

export default ItemCard;
