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
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      elevation={3}
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* Brand */}
        <Box display="flex" alignItems="center">
          
          <IconButton
            edge="start"
            color="inherit"
            component={RouterLink}
            to="/"
            sx={{ mr: 1 }}
          >
            
          </IconButton>
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: 1,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <b>Countries Explorer</b>
          </Typography>
        </Box>

        {/* Spacer */}
        <Box flexGrow={1} />

        {/* Auth Controls */}
        {user ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography
              variant="body1"
              sx={{
                display: { xs: "none", sm: "block" },
                fontWeight: 500,
              }}
            >
              Hi, {user.name}
            </Typography>

            <Tooltip title="Favorites">
              <IconButton
                color="inherit"
                component={RouterLink}
                to="/favorites"
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Account options">
              <IconButton color="inherit" onClick={handleAvatarClick}>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  {user.name[0].toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                component={RouterLink}
                to="/favorites"
                onClick={handleMenuClose}
              >
                <FavoriteIcon fontSize="small" sx={{ mr: 1 }} /> Favorites
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            color="inherit"
            startIcon={<LoginIcon />}
            onClick={() => navigate("/login")}
            sx={{ fontWeight: 600 }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
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
