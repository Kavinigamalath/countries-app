// src/components/Header.jsx

import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Tooltip,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import logo from "../assets/logo.png";  // <-- your logo file

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  // mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen(o => !o);

  // avatar menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openAvatarMenu = e => setAnchorEl(e.currentTarget);
  const closeAvatarMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    closeAvatarMenu();
    logout();
    navigate("/");
  };

  const drawer = (
    <Box sx={{ width: 260 }} role="presentation" onClick={toggleMobile} onKeyDown={toggleMobile}>
      {/* logo + title in drawer */}
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{ height: 32, width: "auto", mr: 1 }}
        />
        <Typography variant="h6">Country Explorer</Typography>
      </Box>
      <Divider />

      <List>
        <ListItemButton component={RouterLink} to="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        {user && (
          <ListItemButton component={RouterLink} to="/favorites">
            <ListItemIcon><FavoriteIcon /></ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItemButton>
        )}

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
      <AppBar
        position="static"
        elevation={3}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
          width: "100%",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              minHeight: { xs: 64, sm: 72, md: 80 },
              px: { xs: 2, sm: 4, md: 6 },
            }}
          >
            {/* Mobile hamburger */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleMobile}
              sx={{
                mr: 2,
                display: { sm: "none" },
                "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.1) },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Brand + Logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                mr: 2,
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Country Explorer Logo"
                sx={{
                  height: { xs: 28, sm: 36, md: 44 },
                  width: "auto",
                  mr: 1.5,
                }}
              />
              <Box>
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
                <Typography
                  variant="caption"
                  sx={{ color: alpha(theme.palette.common.white, 0.8) }}
                >
                  Discover the world
                </Typography>
              </Box>
            </Box>

            {/* Spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop nav & auth */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1 }}>
              <Button
                component={RouterLink}
                to="/"
                startIcon={<HomeIcon />}
                color="inherit"
                sx={{
                  fontWeight: 600,
                  "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.1) },
                }}
              >
                Home
              </Button>

              {user && (
                <Tooltip title="Favorites">
                  <IconButton
                    component={RouterLink}
                    to="/favorites"
                    color="inherit"
                    sx={{ "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.1) } }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              )}

              {user ? (
                <>
                  <Tooltip title={`Hi, ${user.name}`}>
                    <IconButton onClick={openAvatarMenu} sx={{ p: 0 }}>
                      <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                        {user.name[0].toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={closeAvatarMenu}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem component={RouterLink} to="/favorites" onClick={closeAvatarMenu}>
                      <FavoriteIcon fontSize="small" sx={{ mr: 1 }} /> Favorites
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  color="inherit"
                  startIcon={<LoginIcon />}
                  onClick={() => navigate("/login")}
                  sx={{ fontWeight: 600, "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.1) } }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleMobile} ModalProps={{ keepMounted: true }}>
        {drawer}
      </Drawer>
    </>
  );
}


// // src/components/Header.jsx
// import React, { useContext, useState } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Button,
//   Avatar,
//   Menu,
//   MenuItem,
//   Box
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import LogoutIcon from "@mui/icons-material/Logout";
// import LoginIcon from "@mui/icons-material/Login";

// export default function Header() {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleAvatarClick = (e) => {
//     setAnchorEl(e.currentTarget);
//   };
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };
//   const handleLogout = () => {
//     handleMenuClose();
//     logout();
//     navigate("/");
//   };

//   return (
//     <AppBar position="static" elevation={3} color="primary">
//       <Toolbar sx={{ justifyContent: "space-between" }}>
//         {/* Brand */}
//         <Box display="flex" alignItems="center">
//           <IconButton
//             edge="start"
//             color="inherit"
//             component={RouterLink}
//             to="/"
//             sx={{ mr: 1 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             component={RouterLink}
//             to="/"
//             sx={{
//               color: "inherit",
//               textDecoration: "none",
//               fontWeight: 700,
//               letterSpacing: 1,
//             }}
//           >
//             Countries
//           </Typography>
//         </Box>

//         {/* Spacer */}
//         <Box flexGrow={1} />

//         {/* Auth Controls */}
//         {user ? (
//           <Box display="flex" alignItems="center" gap={2}>
//             <Typography variant="body1" sx={{ display: { xs: "none", sm: "block" } }}>
//               Hi, {user.name}
//             </Typography>
//             <IconButton
//               color="inherit"
//               component={RouterLink}
//               to="/favorites"
//             >
//               <FavoriteIcon />
//             </IconButton>
//             <IconButton color="inherit" onClick={handleAvatarClick}>
//               <Avatar sx={{ bgcolor: "secondary.main" }}>
//                 {user.name[0].toUpperCase()}
//               </Avatar>
//             </IconButton>

//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//               anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//               transformOrigin={{ vertical: "top", horizontal: "right" }}
//             >
//               <MenuItem
//                 component={RouterLink}
//                 to="/favorites"
//                 onClick={handleMenuClose}
//               >
//                 <FavoriteIcon fontSize="small" sx={{ mr: 1 }} /> Favorites
//               </MenuItem>
//               <MenuItem onClick={handleLogout}>
//                 <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
//               </MenuItem>
//             </Menu>
//           </Box>
//         ) : (
//           <Button
//             color="inherit"
//             startIcon={<LoginIcon />}
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }
