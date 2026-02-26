// import { createBrowserRouter, Navigate } from "react-router-dom";
// import RootLayout from "../Layouts/RootLayout";
// import Login from "../pages/Login/Login";
// import DashboardHome from "../pages/DashboardHome/DashboardHome";
// import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";

// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <RootLayout />,
//         children: [
//             {
//                 path: "login",
//                 element: <Login />,
//             },
//             {
//                 path: "/",
//                 element: <DashboardLayout />, 
//                 children: [
//                     {
//                         index: true,
//                         element: <DashboardHome />,
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         path: "*",
//         element: <Navigate to="/login" replace />,
//     }
// ]);


import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Login from "../pages/Login/Login";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";

export const router = createBrowserRouter([

    {
        path: "/",
        element: <DashboardLayout />, 
    },

]);