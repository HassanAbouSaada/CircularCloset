import { useContext } from "react";
import { Layout } from "antd";
import AddNewCloset from "../../components/Closet/AddNewCloset";
import { ClosetContext } from "../../context/ClosetContext";

const { Content } = Layout;

export default function NewCloset() {
  const { closets, setClosets } = useContext(ClosetContext);

  return (
    <Layout style={{ minHeight: "100vh", marginLeft: "200px" }}>
      <Content style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "400px", marginTop: "-200px" }}>
          
          <AddNewCloset closets={closets} setClosets={setClosets} />
        </div>
      </Content>
    </Layout>
  );
}