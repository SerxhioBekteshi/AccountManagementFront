import IRoute from "../../main/interfaces/IRoute";
import loadable from "@loadable/component";

const adminRoutes: Array<IRoute> = [
  {
    path: "/admin",
    element: loadable(() => import("./pages/adminDashboard")),
    private: true,
  },
  {
    path: "/admin/companies",
    element: loadable(() => import("./pages/companies")),
    private: true,
  },
  {
    path: "/admin/categories",
    element: loadable(() => import("./pages/categories")),
    private: true,
  },
  {
    path: "/admin/currencies",
    element: loadable(() => import("./pages/currencies")),
    private: true,
  },
  {
    path: "/admin/banks",
    element: loadable(() => import("./pages/banks")),
    private: true,
  },
  {
    path: "/admin/companies/addCompanyManager/:id",
    element: loadable(() => import("./pages/registerCompanyManager")),
    private: true,
  },
  {
    path: "/admin/order-transactions",
    element: loadable(() => import("./pages/OrderTransactions")),
    private: true,
  },
  {
    path: "/admin/profile/:tabId",
    element: loadable(() => import("./pages/profile")),
    private: true,
  },
].map((x, id) => ({ id, ...x }));

export default adminRoutes;
