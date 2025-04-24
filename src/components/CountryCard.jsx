import React, { useContext } from "react"; // Import React and the useContext hook for accessing context
import {
  Card, // MUI Card component for creating a card container
  CardActionArea, // Area within the card that responds to click/tap interactions
  CardMedia, // Component to display media (e.g., images) within the card
  CardContent, // Container for the main content of the card
  CardActions, // Container for action buttons at the bottom of the card
  Typography, // Component for rendering text with MUI typographic styles
  Button, // MUI Button component for clickable actions
  Chip, // MUI Chip component for displaying small pieces of information
  Stack, // MUI layout component for arranging items in a stack
  Box // MUI Box component as a generic container with styling
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Icon for a filled favorite (heart)
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Icon for an outlined favorite (heart)
import InfoIcon from "@mui/icons-material/Info"; // Icon representing information
import { Link as RouterLink } from "react-router-dom"; // Rename Link to RouterLink for navigation
import { AuthContext } from "../contexts/AuthContext"; // Import authentication context to access user favorites

export default function CountryCard({ country }) { // Define CountryCard component receiving a country prop
  const { cca3, flags, name, population, region, capital } = country; // Destructure needed country properties
  const { user, addFavorite, removeFavorite } = useContext(AuthContext); // Access user data and favorite handlers from context
  const isFav = user?.favorites.includes(cca3); // Determine if this country is in the user's favorites

  return (
    <Card
      sx={{
        width: 260, // Set card width to 260px
        borderRadius: 2, // Round card corners
        boxShadow: 3, // Apply a box shadow level
        transition: "transform .2s, box-shadow .2s", // Smooth transition on hover
        "&:hover": {
          transform: "translateY(-4px)", // Lift card slightly on hover
          boxShadow: 6 // Increase shadow on hover
        },
        display: "flex", // Use flexbox layout
        flexDirection: "column" // Stack children vertically
      }}
    >
      <CardActionArea component={RouterLink} to={`/country/${cca3}`} sx={{ flexGrow: 1 }}> {/* Make the top area clickable, linking to details */}
        <Box
          sx={{
            position: "relative", // Position container relative for overlay
            pt: "56.25%", // Maintain 16:9 aspect ratio padding-top
            overflow: "hidden", // Clip overflow content
            borderTopLeftRadius: 8, // Round top-left corner
            borderTopRightRadius: 8 // Round top-right corner
          }}
        >
          <CardMedia
            component="img" // Render an img element
            image={flags.svg} // Source URL for the flag image
            alt={`${name.common} flag`} // Alt text for accessibility
            sx={{
              position: "absolute", // Position image absolutely to fill container
              top: 0, left: 0, width: "100%", height: "100%",
              objectFit: "cover" // Cover the container without distortion
            }}
          />
          {/* gradient overlay */}
          <Box
            sx={{
              position: "absolute", // Overlay positioned absolutely
              inset: 0, // Stretch to all edges of parent
              background: "linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5))" // Fade gradient at bottom
            }}
          />
          <Typography
            variant="h6" // Use h6 typographic variant
            component="div" // Render as a div element
            sx={{
              position: "absolute", // Position text absolutely
              bottom: 8, // Place 8px from bottom
              left: 8, // Place 8px from left
              color: "white", // White text color
              textShadow: "0 1px 4px rgba(0,0,0,0.7)" // Subtle shadow for readability
            }}
          >
            {name.common} {/* Display the common name of the country */}
          </Typography>
        </Box>
      </CardActionArea>

      <CardContent sx={{ p: 1.5 }}> {/* Container for region, capital, and population */}
        <Stack direction="row" spacing={0.5} flexWrap="wrap"> {/* Horizontal stack for chips */}
          <Chip label={region} size="small" variant="outlined" /> {/* Show region */}
          <Chip label={capital?.[0] || "—"} size="small" variant="outlined" /> {/* Show capital or dash */}
        </Stack>
        <Typography
          variant="body2" // Use body2 text style
          color="text.secondary" // Secondary text color
          sx={{ mt: 1 }} // Top margin
        >
          Population: <strong>{population.toLocaleString()}</strong> {/* Display formatted population */}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 1, justifyContent: "space-between" }}> {/* Container for action buttons */}
        <Button
          size="small" // Small button size
          startIcon={<InfoIcon fontSize="small" />} // Info icon on the button
          component={RouterLink} // Use RouterLink for navigation
          to={`/country/${cca3}`} // Link to detail page
        >
          Details {/* Button text */}
        </Button>

        {user && ( // Only show favorite button if user is logged in
          <Button
            size="small"
            color={isFav ? "secondary" : "primary"} // Change color if favorited
            startIcon={isFav ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />} // Toggle icon
            onClick={() => isFav ? removeFavorite(cca3) : addFavorite(cca3)} // Add or remove favorite on click
          >
            {isFav ? "Unfav" : "Fav"} {/* Toggle button label */}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
