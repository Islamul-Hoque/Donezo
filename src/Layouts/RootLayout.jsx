import { Outlet } from 'react-router';

// RootLayout currently doesn't need any extra markup but we keep it
// so that we could easily add wrappers (e.g. theme provider) later.
// It also forwards children correctly.
export default function RootLayout({ children }) {
  return <>{children || <Outlet />}</>;
}
