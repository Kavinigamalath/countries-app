// src/components/Header.jsx

// Import React and hooks
import React, { useContext, useState } from "react";

// Import authentication context
import { AuthContext } from "../contexts/AuthContext";

// Import router utilities
import { Link as RouterLink, useNavigate } from "react-router-dom";

// Import Material-UI components
import {
  AppBar,        // Top navigation bar
  Toolbar,       // Container for items inside AppBar
  Typography,    // Text component
  IconButton,    // Button for icons
  Button,        // Regular button
  Avatar,        // User avatar
  Menu,          // Dropdown menu
  MenuItem,      // Individual menu item
  Box,           // Generic container component
  Tooltip,       // Hover tooltip
  Drawer,        // Slide-in panel
  List,          // List container
  ListItemButton,// Clickable list item
  ListItemIcon,  // Icon in list item
  ListItemText,  // Text in list item
  Container,     // Centers content with fixed width
  Divider,       // Horizontal divider line
  useTheme,      // Hook to access theme
  alpha,         // Utility to set transparency
} from "@mui/material";

// Import icons
import MenuIcon from "@mui/icons-material/Menu";          // Hamburger icon
import HomeIcon from "@mui/icons-material/Home";          // Home icon
import FavoriteIcon from "@mui/icons-material/Favorite";  // Favorite icon
import LogoutIcon from "@mui/icons-material/Logout";      // Logout icon
import LoginIcon from "@mui/icons-material/Login";        // Login icon

// Import logo image
import logo from "../assets/logo.png";  // <-- your logo file

// Define Header component
export default function Header() {
  // Get user and logout function from context
  const { user, logout } = useContext(AuthContext);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Access theme for colors
  const theme = useTheme();

  // State for mobile drawer open/close
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle the mobile drawer
  const toggleMobile = () => setMobileOpen(o => !o);

  // State and handlers for avatar menu
  const [anchorEl, setAnchorEl] = useState(null);        // Anchor element of menu
  const openAvatarMenu = e => setAnchorEl(e.currentTarget); // Open menu at clicked avatar
  const closeAvatarMenu = () => setAnchorEl(null);          // Close the avatar menu

  // Handle user logout
  const handleLogout = () => {
    closeAvatarMenu();       // Close the avatar menu
    logout();                // Call logout from context
    navigate("/");           // Redirect to home
  };

  // Define the mobile drawer content
  const drawer = (
    <Box
      sx={{ width: 260 }}  // Set width of drawer
      role="presentation"
      onClick={toggleMobile}  // Close drawer when clicking inside
      onKeyDown={toggleMobile} // Close drawer on key events
    >
      {/* Logo and title inside the drawer */}
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <Box
          component="img"
          src={logo}      // Logo image
          alt="Logo"     // Alt text
          sx={{ height: 32, width: "auto", mr: 1 }}  // Styling
        />
        <Typography variant="h6">Country Explorer</Typography> {/* Drawer title */}
      </Box>
      <Divider /> {/* Separator line */}

      <List>
        {/* Home link */}
        <ListItemButton component={RouterLink} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        {/* Favorites link, only if user is logged in */}
        {user && (
          <ListItemButton component={RouterLink} to="/favorites">
            <ListItemIcon><FavoriteIcon /></ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItemButton>
        )}

        {/* Logout or Login depending on authentication */}
        {user ? (
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        ) : (
          <ListItemButton onClick={() => navigate("/login")}>
            <ListItemIcon><LoginIcon /></ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  return (
    <>
      {/* Main AppBar */}
      <AppBar
        position="static"  // Fixed position at top
        elevation={3}      // Shadow elevation
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`, // Gradient background
          width: "100%",
        }}
      >
        <Container maxWidth="xl"> {/* Center the toolbar */}
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",      // Space between children
              minHeight: { xs: 64, sm: 72, md: 80 }, // Responsive height
              px: { xs: 2, sm: 4, md: 6 },           // Responsive padding
            }}
          >
            {/* Mobile hamburger icon */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleMobile}
              sx={{
                mr: 2,                           // Right margin
                display: { sm: "none" },        // Hide on sm+ screens
                "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.1) }, // Hover effect
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Brand logo and title */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                mr: 2,           // Right margin
              }}
            >
              <Box
                component="img"
                src={logo}      // Logo image
                alt="Country Explorer Logo"
                sx={{
                  height: { xs: 28, sm: 36, md: 44 }, // Responsive height
                  width: "auto",
                  mr: 1.5,                             // Right margin
                  borderRadius: "8px",                // <-- rounded corners
                }}
              />
              <Box>
                {/* Main title */}
                <Typography
                  variant="h5"
                  sx={{
                    color: "inherit",
                    fontWeight: 700,
                    lineHeight: 1.1,
                  }}
                >
                  Country Explorer
                </Typography>
                {/* Subtitle */}
                <Typography
                  variant="caption"
                  sx={{ color: alpha(theme.palette.common.white, 0.8) }}
                >
                  Discover the world
                </Typography>
              </Box>
            </Box>

            {/* Spacer to push nav to the right */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop navigation & authentication */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1 }}>
              {/* Home button */}
              <Button
                component={RouterLink}
                to="/"
                startIcon={<HomeIcon />}
                color="inherit"
                sx={{
                  fontWeight: 600,
                  "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.1) }, // Hover effect
                }}
              >
                Home
              </Button>

              {/* Favorites icon, if logged in */}
              {user && (
                <Tooltip title="Favorites">
                  <IconButton
                    component={RouterLink}
                    to="/favorites"
                    color="inherit"
                    sx={{ "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.1) } }} // Hover effect
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              )}

              {/* Avatar & menu when logged in, or login button otherwise */}
              {user ? (
                <>
                  {/* Avatar button */}
                  <Tooltip title={`Hi, ${user.name}`}>
                    <IconButton onClick={openAvatarMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                        {user.name[0].toUpperCase()} {/* First letter of user */}
                      </Avatar>
                    </IconButton>
                  </Tooltip>

                  {/* Dropdown menu under avatar */}
                  <Menu
                    anchorEl={anchorEl}               // Element to anchor menu
                    open={Boolean(anchorEl)}          // Open state
                    onClose={closeAvatarMenu}         // Close handler
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}   // Where menu appears
                    transformOrigin={{ vertical: "top", horizontal: "right" }}   // Pivot point
                  >
                    {/* Menu item: Favorites */}
                    <MenuItem component={RouterLink} to="/favorites" onClick={closeAvatarMenu}>
                      <FavoriteIcon fontSize="small" sx={{ mr: 1 }} /> Favorites
                    </MenuItem>
                    {/* Menu item: Logout */}
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                // Login button when not authenticated
                <Button
                  color="inherit"
                  startIcon={<LoginIcon />}
                  onClick={() => navigate("/login")}
                  sx={{ fontWeight: 600, "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.1) } }} // Hover
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer for small screens */}
      <Drawer
        anchor="left"          // Slide in from left
        open={mobileOpen}      // Controlled by state
        onClose={toggleMobile} // Close handler
        ModalProps={{ keepMounted: true }} // Improve performance
      >
        {drawer}               {/* Render drawer content*/}
      </Drawer>
    </>
  );
}
