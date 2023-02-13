import { useToast } from "@chakra-ui/react";
import { redirect, RouteObject } from "react-router-dom";
import DashboardHome from "../pages/dashboard/dashboard-home";
import DashboardLayout from "../pages/dashboard/dashboard-layout";
import DashboardRoom from "../pages/dashboard/dashboard-room";
import { getProfile } from "../services/auth.service";

const routeDashboard: RouteObject[] = [
   {
      path: "/dashboard",
      element: <DashboardLayout />,
      // เช็คว่า login ยัง
      loader: async () => {
         const response = await getProfile();
         if (!response?.data.data.user) {
            throw redirect("/login");
         }
         return response.data.data.user;
      },
      children: [
         {
            path: "", // localhost:4000/dashboard
            element: <DashboardHome />,
         },
         {
            path: "room", // localhost:4000/dashboard/room
            element: <DashboardRoom />,
         },
      ],
   },
];

export default routeDashboard;
