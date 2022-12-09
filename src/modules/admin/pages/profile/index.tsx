import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import ProfileViewData from "../../../../main/views/profile/ProfileViewData";
import ProfileEdit from "../../../../main/views/profile/ProfileEdit";
import ProfileChangePassword from "../../../../main/views/profile/ProfileChangePassword";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const { tabId } = useParams();

  const navigate = useNavigate();

  const [userData, setUserData] = useState<any>(null);

  const fetchUserData = async () => {
    const res: any = await (await axios.get("/user")).data;
    setUserData(res);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const toggle = (tab: any) => {
    navigate(`/admin/profile/${tab}`);
  };

  return (
    userData && (
      <Row>
        <Col md="4">
          <ProfileViewData userData={userData} />
        </Col>
        <Col md="8">
          <Card
            style={{
              marginTop: "1rem",
              border: "1px solid black",
              borderRadius: "1rem",
            }}
          >
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={
                    tabId === "viewEdit"
                      ? "active bg-transparent"
                      : "cursor-pointer"
                  }
                  onClick={() => {
                    toggle("viewEdit");
                  }}
                >
                  <FontAwesomeIcon
                    icon={"fa-solid fa-user-pen" as any}
                    size="lg"
                  />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={
                    tabId === "changePassword"
                      ? "active bg-transparent"
                      : "cursor-pointer"
                  }
                  onClick={() => {
                    toggle("changePassword");
                  }}
                >
                  <FontAwesomeIcon icon={"fa-solid fa-gear" as any} size="lg" />
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={tabId}>
              <TabPane tabId="viewEdit">
                <ProfileEdit userData={userData} />
              </TabPane>
              <TabPane tabId="changePassword">
                <ProfileChangePassword />
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>
    )
  );
};

export default Profile;
