import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../app/layout/App";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../features/activities/details/ActivityDetails";
import TestErrors from "../features/errors/TestError";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetails /> },
      // "create" key necessary to select empty form via the "createActivity" route if we happen to be editing <ActivityForm via the "manage/:id" route
      { path: "createActivity", element: <ActivityForm key="create" /> },
      { path: "manage/:id", element: <ActivityForm key="manage" /> },
      { path: "errors", element: <TestErrors /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
