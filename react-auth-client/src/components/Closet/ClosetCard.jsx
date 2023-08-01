import { Link } from "react-router-dom";
import { Card, Typography } from "antd";

const { Text } = Typography;

export default function ClosetCard({ closet }) {
  return (
    <Card className="ClosetCard">
      <Link
        to={{
          pathname: `closet/${closet._id}`,
          state: { backgroundColor: closet.color },
        }}
      >
        <div
          style={{
            aspectRatio: `${closet.width}/${closet.height}`,
            background: closet.color,
          }}
          className="ClosetCard__content"
        >
          <Text strong className="ClosetCard__text">
            {closet.title}
          </Text>
        </div>
      </Link>
    </Card>
  );
}
