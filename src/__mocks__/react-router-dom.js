// src/__mocks__/react-router-dom.js
import React from "react";

// A no‑op Router that just renders its children
export const MemoryRouter = ({ children }) => <>{children}</>;

// Stubbed Link → renders a plain <a>
export const Link = ({ to, children, ...props }) =>
  <a href={to} {...props}>{children}</a>;

// Stubbed Navigate → renders nothing
export const Navigate = () => null;

// Stubbed hooks
export const useNavigate = () => () => {};
export const useParams   = () => ({});
export const useLocation = () => ({});
export const useMatch    = () => null;

// Stubbed Routes/Route so they just inline their element
export const Routes = ({ children }) => <>{children}</>;
export const Route  = ({ element })    => element;

// BrowserRouter as a no‑op too
export const BrowserRouter = MemoryRouter;
