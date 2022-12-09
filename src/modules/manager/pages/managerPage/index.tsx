import {
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import CompanyList from "../../../../main/views/CompanyList";
import TwoColumn from "../../../../main/components/TwoColumn";
import CompanyCategories from "../../../../main/views/CompanyDetails/CompanyCategories";
import CompanyEmployees from "../../../../main/views/CompanyDetails/CompanyEmployees";

import axios from "axios";
import { useEffect, useState } from "react";
import "./style.scss";

const ManagerPage = () => {
  const [categories, setCategories] = useState([]);
  const [companyId, setCompanyId] = useState(0);
  const [value, setValue] = useState<string>("categories");

  const fetchByCompany = async () => {
    if (companyId != 0) {
      switch (value) {
        case "categories":
          const res: any = await axios.get(
            `/Companies/${companyId}/categories`
          );
          if (res.data.result) {
            setCategories(res.data.data);
          }
          break;

        case "employees":
          break;
      }
    }
  };

  useEffect(() => {
    fetchByCompany();
  }, [companyId]);

  return (
    <div>
      <TwoColumn
        middleContent={
          <>
            <CompanyList setCompanyId={setCompanyId} />
          </>
        }
        rightContent={
          <>
            <Card style={{ height: "90vh" }}>
              <CardHeader tag="h6" className="p-0 border-bottom-0">
                <Nav tabs fill>
                  <NavItem>
                    <NavLink
                      active={value == "categories"}
                      className="onClick"
                      onClick={() => setValue("categories")}
                    >
                      Categories
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="onClick"
                      active={value == "employees"}
                      onClick={() => setValue("employees")}
                    >
                      Employees
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="onClick"
                      active={value == "products"}
                      onClick={() => setValue("products")}
                    >
                      Products
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={value}>
                  <TabPane tabId="categories">
                    <CompanyCategories
                      categories={categories}
                      companyId={companyId}
                      fetchCategoriesByCompany={fetchByCompany}
                    />
                  </TabPane>
                  <TabPane tabId="employees">
                    <CompanyEmployees companyId={companyId} />
                  </TabPane>
                  <TabPane tabId="products">
                    <div> HELLO WORLD </div>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </>
        }
      />
    </div>
  );
};
export default ManagerPage;
