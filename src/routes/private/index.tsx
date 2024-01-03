import BaseLayout from "components/Layouts/Base";
import DashboardContainer from "pages/Dashboard";
import UserContainer from "pages/User";
import { RouteType } from "types";

export const PrivateRouter: RouteType[] = [
  {
    path: "/",
    element: DashboardContainer,
    layout: BaseLayout,
  },
  {
    path: "/dashboard",
    element: DashboardContainer,
    layout: BaseLayout,
  },
  {
    path: "/user",
    element: UserContainer,
    layout: BaseLayout,
  },
];
