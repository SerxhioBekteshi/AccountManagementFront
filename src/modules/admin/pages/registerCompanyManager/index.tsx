import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import ISelectOption from "../../../../main/interfaces/controllers/ISelectOption";
import RegisterManagerForCompanyFormView from "../../../../main/views/ManagerAccount/RegisterManagerForCompanyForm";
import AssignManagerFormView from "../../../../main/views/ManagerAccount/AssingManagerForm";

const RegisterCompanyManager = () => {
  const { id } = useParams();

  const [value, setValue] = useState<string>("1");

  return (
    <Card style={{ height: "90vh" }}>
      <CardHeader tag="h6" className="p-0 border-bottom-0">
        <Nav tabs fill>
          <NavItem>
            <NavLink
              active={value == "1"}
              className={
                value === "1" ? "active bg-transparent" : "cursor-pointer"
              }
              onClick={() => setValue("1")}
            >
              Assing a manager
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={
                value === "2" ? "active bg-transparent" : "cursor-pointer"
              }
              active={value == "2"}
              onClick={() => setValue("2")}
            >
              Create new account
            </NavLink>
          </NavItem>
        </Nav>
      </CardHeader>
      <CardBody>
        <TabContent activeTab={value}>
          <TabPane tabId="1">
            <AssignManagerFormView companyId={id} />
          </TabPane>
          <TabPane tabId="2">
            <RegisterManagerForCompanyFormView id={id} />
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
};

export default RegisterCompanyManager;
