import React, { useContext } from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InfoIcon from "@mui/icons-material/Info";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function CountryCard({ country }) {
  const { cca3, flags, name, population, region, capital } = country;
  const { user, addFavorite, removeFavorite } = useContext(AuthContext);
  const isFav = user?.favorites.includes(cca3);

  return (
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
      <CardActionArea component={RouterLink} to={`/country/${cca3}`} sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            position: "relative",
            pt: "56.25%",         // 16:9 aspect ratio
            overflow: "hidden",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8
          }}
        >
          <CardMedia
            component="img"
            image={flags.svg}
            alt={`${name.common} flag`}
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
            {name.common}
          </Typography>
        </Box>
      </CardActionArea>

      <CardContent sx={{ p: 1.5 }}>
        <Stack direction="row" spacing={0.5} flexWrap="wrap">
          <Chip label={region} size="small" variant="outlined" />
          <Chip label={capital?.[0] || "—"} size="small" variant="outlined" />
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Population: <strong>{population.toLocaleString()}</strong>
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 1, justifyContent: "space-between" }}>
        <Button
          size="small"
          startIcon={<InfoIcon fontSize="small" />}
          component={RouterLink}
          to={`/country/${cca3}`}
        >
          Details
        </Button>

        {user && (
          <Button
            size="small"
            color={isFav ? "secondary" : "primary"}
            startIcon={isFav ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            onClick={() => isFav ? removeFavorite(cca3) : addFavorite(cca3)}
          >
            {isFav ? "Unfav" : "Fav"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}





// import React from "react";
// import { Link } from "react-router-dom";

// export default function CountryCard({ country }) {
//   const { cca3, flags, name, population, region, capital } = country;
//   return (
//     <Link to={`/country/${cca3}`}>
//       <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden">
//         <img src={flags.svg} alt={`${name.common} flag`} className="w-full h-40 object-cover" />
//         <div className="p-4">
//           <h2 className="font-bold mb-2">{name.common}</h2>
//           <p><strong>Population:</strong> {population.toLocaleString()}</p>
//           <p><strong>Region:</strong> {region}</p>
//           <p><strong>Capital:</strong> {capital?.[0] || "—"}</p>
//         </div>
//       </div>
//     </Link>
//   );
// }
