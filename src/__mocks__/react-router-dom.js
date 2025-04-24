import React from "react";

// No-op (stub) router components/hooks for testing purposes:
// These implementations let you render components that expect
// react-router APIs without pulling in the real router.

export const MemoryRouter = ({ children }) => 
  // Simply render children as-is, ignoring any routing logic
  <>{children}</>;

export const BrowserRouter = 
  // Alias BrowserRouter to MemoryRouter so components importing either work
  MemoryRouter;

export const Routes  = ({ children }) => 
  // Render all Route children without interpreting path matching
  <>{children}</>;

export const Route   = ({ element }) => 
  // Return the provided element directly, bypassing any route checks
  element;

export const Link    = ({ to, children, ...props }) => 
  // Render a plain <a> tag with href set to "to" for link navigation
  <a href={to} {...props}>{children}</a>;

export const Navigate = () => 
  // Stub redirect component—renders nothing (null)
  null;

export const useNavigate = () => 
  // Hook that returns a no-op function, ignoring navigation calls
  () => {};

export const useParams   = () => 
  // Hook that returns an empty object, simulating no route params
  ({});

export const useLocation = () => 
  // Hook that returns an empty object, simulating no location data
  ({});

export const useMatch    = () => 
  // Hook that returns null, simulating no matching route
  null;
