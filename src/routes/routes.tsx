import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "@/ui/layout/Layout";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import PageNotFound from "@/pages/PageNotFound";
import ProtectedRoute from "@/ui/layout/ProtectedRoute";

import AddVehiclePage from "@/pages/AddVehiclePage";
import VehiclePage from "@/pages/VehiclePage";
import EditVehiclePage from "@/pages/EditVehiclePage";

const mainRouter = [
  {
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      { path: "/", index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },

      {
        path: "/vehicles",
        children: [
          {
            path: ":id",
            element: (
              <ProtectedRoute>
                <VehiclePage />
              </ProtectedRoute>
            ),
          },
          {
            path: "add",
            element: (
              <ProtectedRoute>
                <AddVehiclePage />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id/edit",
            element: (
              <ProtectedRoute>
                <EditVehiclePage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);

const MainRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default MainRouter;
