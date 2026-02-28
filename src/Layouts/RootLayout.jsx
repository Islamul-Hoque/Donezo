import { Outlet } from 'react-router';

export default function RootLayout({ children }) {
  return <div className=''>{children || <Outlet />}</div>;
}
