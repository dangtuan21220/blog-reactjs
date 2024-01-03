import { FunctionComponent } from "react";

export type RouteType = {
  path: string;
  element: FunctionComponent;
  layout?: any;
};
