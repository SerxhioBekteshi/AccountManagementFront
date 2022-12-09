import IRoute from "../../main/interfaces/IRoute";
import loadable from "@loadable/component";

const managerRoutes: Array<IRoute> = [
  {
    path: "/manager",
    element: loadable(() => import("./pages/managerPage")),
    private: true,
  },
  {
    path: "/manager/employees",
    element: loadable(() => import("./pages/employeesPage")),
    private: true,
  },
  {
    path: "/manager/productCategories",
    element: loadable(() => import("./pages/productCategories")),
    private: true,
  },
  {
    path: "/manager/products",
    element: loadable(() => import("./pages/employeesPage")),
    private: true,
  },
  {
    path: "/manager/company",
    element: loadable(() => import("./pages/companyView")),
    private: true,
  },
  {
    path: "/manager/company/:id",
    element: loadable(() => import("./pages/companyView")),
    private: true,
  },
].map((x, id) => ({ id, ...x }));

export default managerRoutes;
