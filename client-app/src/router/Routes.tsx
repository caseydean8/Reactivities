import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../app/layout/App";
import HomePage from "../features/home/HomePage";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../features/activities/details/ActivityDetails";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetails /> },
      { path: "createActivity", element: <ActivityForm /> },
      { path: "manage/:id", element: <ActivityForm /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
