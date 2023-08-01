import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "antd";

import UserCard from "../components/UserCard";

import usersService from "../services/users.service";
import PublicItemCard from "../components/Closet/PublicItemCard";

function UsersDetailsPage(props) {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [publicItems, setPublicItems] = useState([]);

  const getUser = () => {
    usersService
      .getUser(userId)
      .then((response) => {
        console.log("response:", response);
        const oneUser = response.data;
        setUser(oneUser);

        const publicItems = oneUser.closets.reduce((items, closet) => {
          return items.concat(closet.items.filter((item) => item.isPublic));
        }, []);

        setPublicItems(publicItems);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="UserDetails">
      {user && (
        <>
          <div style={{ display: "flex" }}>
            <Card
              title={`Welcome to ${user.name}'s Closet`}
              style={{ width: "70%", marginBottom: "16px", marginLeft: "220px" }}
            >
              <img
                src={user.profilePicture}
                alt={user.name}
                style={{
                  width: "100%", // Make the image cover the full width of its container
                  height: "250px", // Set a fixed height to crop the image vertically
                  objectFit: "cover", // Crop the image while maintaining its aspect ratio
                }}
              />
            </Card>
            <div className="UserDetails__right" style={{ width: "30%" }}>
              <Card style={{padding: "40px",  width: "100%", height:"360px" }}>
                <h1>{user.name}</h1>
                <p style={{ fontSize: "16px" }}>{`I live in: ${user.address}`}</p>
                <p style={{ fontSize: "16px" }}>{`my height: ${user.height} cm`}</p>
                <p style={{ fontSize: "16px" }}>{`I weigh: ${user.weight} kg`}</p>
              </Card>
            </div>
          </div>
        </>
      )}

      {publicItems.length > 0 && (
        <>
          <h1 style={{ marginLeft: "150px" }}>I'm sharing these items:</h1>
          {publicItems.map((item) => (
            <PublicItemCard key={item._id} item={item} />
          ))}
        </>
      )}

      <Link to="/userspage">
        <button>Back to users</button>
      </Link>
    </div>
  );
}

export default UsersDetailsPage;
