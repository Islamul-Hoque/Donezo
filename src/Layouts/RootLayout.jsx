import { Outlet } from "react-router";
import Login from "../pages/Login/Login";

export default function RootLayout() {
    return <>
        <Outlet />
    </>
}