import React, { useState, useContext } from "react";
import { Card, Typography, Modal, Tag } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const { Title, Paragraph } = Typography;

function UserCard({ name, address, height, weight, profilePicture, _id, hasPublicItem }) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const handlePreview = () => {
    setPreviewVisible(true);
  };

  const handleClosePreview = () => {
    setPreviewVisible(false);
  };

  return (
    <Card className="UserCard">
      <div className="UserCard-imageContainer" onClick={handlePreview}>
        <img className="UserCard-image" src={profilePicture} alt="" />
      </div>
      <div className="UserCard-content">
        <Link to={`/userspage/${_id}`} style={{ textDecoration: "none" }}>
          <Title level={3} style={{ fontSize: "16px" }}>
            {name}
          </Title>
        </Link>

        {/* Display a tag if the user has public items */}
        {hasPublicItem && <Tag color="green">Is Sharing Now</Tag>}

        <Title level={4} style={{ fontSize: "14px", color: "gray" }}>
          Address:
        </Title>
        <Paragraph style={{ fontSize: "14px", color: "gray" }}>
          {address}
        </Paragraph>
        <Title level={4} style={{ fontSize: "14px", color: "gray" }}>
          Height:
        </Title>
        <Paragraph style={{ fontSize: "14px", color: "gray" }}>
          {height}
        </Paragraph>
        <Title level={4} style={{ fontSize: "14px", color: "gray" }}>
          Weight:
        </Title>
        <Paragraph style={{ fontSize: "14px", color: "gray" }}>
          {weight}
        </Paragraph>
      </div>

      <Modal visible={previewVisible} onCancel={handleClosePreview} footer={null}>
        <img className="UserCard-previewImage" src={profilePicture} alt="" />
      </Modal>
    </Card>
  );
}

export default UserCard;
