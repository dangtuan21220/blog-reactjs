import { lazy } from "react";
import AuthLayout from "components/Layouts/Auth";
import { RouteType } from "types";

const SignInContainer = lazy(() => import("pages/SignIn"));
const SignUpContainer = lazy(() => import("pages/SignUp"));

export const PublicRouter: RouteType[] = [
  {
    path: "/signin",
    element: SignInContainer,
    layout: AuthLayout,
  },
  {
    path: "/",
    element: SignInContainer,
    layout: AuthLayout,
  },
  {
    path: "/signup",
    element: SignUpContainer,
    layout: AuthLayout,
  },
  {
    path: "*",
    element: SignInContainer,
    layout: AuthLayout,
  },
];
