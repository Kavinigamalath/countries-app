// Import React and the useContext hook for accessing context
import React, { useContext } from "react";

// Import Material-UI components for styling and layout
import {
  Card, 
  CardActionArea, 
  CardMedia, 
  CardContent,
  CardActions,
  Typography, 
  Button, 
  Chip, 
  Stack,
  Box 
} from "@mui/material";

// Import icons for favorite and info actions
import FavoriteIcon from "@mui/icons-material/Favorite"; 
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; 
import InfoIcon from "@mui/icons-material/Info"; 
import { Link as RouterLink } from "react-router-dom"; 
import { AuthContext } from "../contexts/AuthContext"; 

// Import AuthContext for user authentication and favorite management
export default function CountryCard({ country }) { 
  const { cca3, flags, name, population, region, capital } = country; 
  const { user, addFavorite, removeFavorite } = useContext(AuthContext); 
  const isFav = user?.favorites.includes(cca3); 

  return (
    // Card component for displaying country information
    <Card
      sx={{
        width: 260, 
        borderRadius: 2, 
        boxShadow: 3,
        transition: "transform .2s, box-shadow .2s", 
        "&:hover": {
          transform: "translateY(-4px)", 
          boxShadow: 6 
        },
        display: "flex", 
        flexDirection: "column" 
      }}
    >
      {/* Top area with flag image and country name.  Make the top area clickable, linking to details*/}
      <CardActionArea component={RouterLink} to={`/country/${cca3}`} sx={{ flexGrow: 1 }}> 
        <Box
          sx={{
            position: "relative", 
            pt: "56.25%", 
            overflow: "hidden", 
            borderTopLeftRadius: 8, 
            borderTopRightRadius: 8 
          }}
        >
          {/* Flag image */}
          <CardMedia
            component="img" 
            image={flags.svg} // Source URL for the flag image
            alt={`${name.common} flag`} // Alt text for accessibility
            sx={{
              position: "absolute", 
              top: 0, left: 0, width: "100%", height: "100%",
              objectFit: "cover" 
            }}
          />
          {/* gradient overlay */}
          <Box
            sx={{
              position: "absolute", 
              inset: 0, 
              background: "linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5))" 
            }}
          />
          {/* Country name text */}
          <Typography
            variant="h6" 
            component="div" 
            sx={{
              position: "absolute", 
              bottom: 8, 
              left: 8, 
              color: "white", 
              textShadow: "0 1px 4px rgba(0,0,0,0.7)" 
            }}
          >
            {name.common} {/* Display the common name of the country */}
          </Typography>
        </Box>
      </CardActionArea>

      {/* Container for region, capital, and population */}
      <CardContent sx={{ p: 1.5 }}> 
        <Stack direction="row" spacing={0.5} flexWrap="wrap"> {/* Horizontal stack for chips */}
          <Chip label={region} size="small" variant="outlined" /> 
          <Chip label={capital?.[0] || "—"} size="small" variant="outlined" /> 
        </Stack>

        <Typography
          variant="body2" // Use body2 text style
          color="text.secondary" // Secondary text color
          sx={{ mt: 1 }} // Top margin
        >
          Population: <strong>{population.toLocaleString()}</strong> {/* Display formatted population */}
        </Typography>
      </CardContent>

      {/* Action buttons for details and favorite */}
      <CardActions sx={{ p: 1, justifyContent: "space-between" }}> 
        <Button
          size="small" 
          startIcon={<InfoIcon fontSize="small" />} 
          component={RouterLink} 
          to={`/country/${cca3}`} // Link to detail page
        >
          Details 
        </Button>

        {user && ( 

          // Show favorite button if user is logged in
          <Button
            size="small"
            color={isFav ? "secondary" : "primary"} 
            startIcon={isFav ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />} 
            onClick={() => isFav ? removeFavorite(cca3) : addFavorite(cca3)} 
          >
            {isFav ? "Unfav" : "Fav"} {/* Toggle button label */}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
