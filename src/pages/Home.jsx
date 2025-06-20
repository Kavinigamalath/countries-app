// Description: Home page component for displaying country data and services
import React, { useState, useMemo } from "react";          
import { useSearchParams, Link } from "react-router-dom";                     
import useFetch from "../hooks/useFetch";                    
import { getAll } from "../api/restCountries";               
import CountryCard from "../components/CountryCard";          
import SpotlightCarousel from "../components/SpotlightCarousel"; 
import FilterDrawer from "../components/FilterDrawer"; 

// Importing service images for the carousel
import s1 from "../assets/services/service1.png";            
import s2 from "../assets/services/service2.png";
import s3 from "../assets/services/service3.png";
import s4 from "../assets/services/service4.png";
import s5 from "../assets/services/service5.png";

// Importing MUI components and icons for UI elements
import {
  AppBar, Toolbar, Typography, IconButton,
  Autocomplete, TextField, Drawer,
  Box, Pagination, Skeleton,
  useTheme, Tooltip, Stack,
} from "@mui/material";

// MUI components for UI layout and interactivity
import FilterListIcon from "@mui/icons-material/FilterList"; 
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; 
import SearchIcon from "@mui/icons-material/Search"; 
import Masonry from "@mui/lab/Masonry";  

const PAGE_SIZE = 24;                                        // Number of items per page
const serviceImages = [s1, s2, s3, s4, s5];                  // Images array for carousel

// Main Home component
export default function Home() {
  const theme = useTheme();                                  
  const { data: all, loading, error } = useFetch(getAll);   

  // State variables for managing filters and pagination
  const [openFilters, setOpenFilters] = useState(false);  
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";                 
  const [region, setRegion] = useState("All");       
  const [language, setLanguage] = useState("All");        
  const page = parseInt(searchParams.get("page") || "1", 10); // get page from URL    

  // Derive unique subregions from countries data
  const subregions = useMemo(
    () =>

      // Create a Set to store unique subregions
      Array.from(
        new Set(
          all
            // Map through countries to get subregions
            ?.map((c) => c.subregion)
            // Filter out undefined or empty subregions
            .filter((sr) => sr && sr !== "")
        )
      ).sort(),
    [all]
  );

  // Derive unique regions
  const regions = useMemo(
    () => Array.from(new Set(all?.map((c) => c.region))).filter(Boolean).sort(),
    [all]
  );

  // Derive unique languages
  const languages = useMemo(() => {
    const s = new Set();
    all?.forEach((c) =>
      Object.values(c.languages || {}).forEach((l) => s.add(l))
    );
    return Array.from(s).sort();
  }, [all]);

  // Derive unique currency codes
  const currencies = useMemo(() => {
    const set = new Set();
    all?.forEach((country) => {
      Object.keys(country.currencies || {}).forEach((code) => set.add(code));
    });
    return Array.from(set);
  }, [all]);

  // Apply search, region, and language filters
  const filtered = useMemo(() => {
    if (!all) return [];
    return all.filter((c) => {
      const nameMatch = c.name.common
        .toLowerCase()
        .startsWith(search.toLowerCase());
      const regionMatch = region === "All" || c.region === region;
      const langMatch =
        language === "All" ||
        Object.values(c.languages || {}).includes(language);
      return nameMatch && regionMatch && langMatch;
    });
  }, [all, search, region, language]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);  // Total pages
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE); // Items on current page
  const filtersActive = region !== "All" || language !== "All"; // Whether any filter is active

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "transparent" }}>
      {/* Hero Banner */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // Change minHeight here to adjust hero card size
          minHeight: "55vh",
          width: "100%",
          px: { xs: 2, sm: 4 }, // Horizontal padding on mobile
        }}
      >
        {/* Hero card container */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 900,           // Constrain width on large screens
            borderRadius: 3,
            overflow: "hidden",
            mt: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 3, sm: 4, md: 5 },
            px: { xs: 2, sm: 4 },
            py: { xs: 4, sm: 6 },
            background: `linear-gradient(135deg, ${theme.palette.primary.main}CC, ${theme.palette.primary.main}CC)`,
            color: "#FFF",
            textAlign: "center",
          }}
        >
          {/* Main title */}
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              fontSize: { xs: "1.5rem", sm: "2.25rem", md: "2.75rem" },
              textShadow: "1px 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            Country Explorer
          </Typography>

          {/* Hero stats grid */}
          <Box
            sx={{
              display: "grid",
              gap: 2,
              mt: 3,
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",  // 2 columns on mobile
                sm: "repeat(6, 1fr)",  // 6 columns on tablet+
              },
            }}
          >
            {[
              // Displaying various statistics about countries
              ["Countries", all?.length || 0],
              ["Regions", regions.length],
              ["Subregions", subregions.length],
              ["Languages", languages.length],
              [
                "Population",
                all
                  ? all
                      .reduce((sum, c) => sum + (c.population || 0), 0)
                      .toLocaleString()
                  : 0,
              ],
              ["Currencies", currencies.length],
            ].map(([label, value], i) => (

              // Each stat is displayed in a box with a background and shadow
              <Box
                key={i}
                sx={{
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(6px)",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                {/* Stat value and label */}
                <Typography variant="h6" fontWeight={700}>
                  {value}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.85 }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Services Title */}
      <Typography
        variant="h3"
        fontWeight={800}
        textAlign="center"
        mb={3}
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem" },
          textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        Our Services
      </Typography>

      {/* Carousel */}
      <Box
        sx={{
          mx: { xs: 1, sm: 2, md: 3 },
          mb: 4,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* Spotlight carousel for displaying service images */}
        <SpotlightCarousel images={serviceImages} interval={4000} />
      </Box>

      {/* AppBar & Filters */}
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          borderRadius: "16px 16px 0 0",
          overflow: "hidden",
        }}
      > 
        {/* AppBar with toolbar for header and filters */}
        <Toolbar
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            px: { xs: 2, sm: 4 },
            py: { xs: 1, sm: 0 },
          }}
        >
          {/* Logo and title */}
          <Typography
            variant="h6"
            sx={{
              mb: { xs: 1, sm: 0 },
              textAlign: { xs: "center", sm: "left" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <b>Country Explorer</b>
          </Typography>

          {/* Search input and filter buttons */} 
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
              width: { xs: "100%", sm: "auto" },
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
          >
            {/* Search input */}
            <Autocomplete
              freeSolo
              options={[]}
              onInputChange={(_, v) => {
                setSearchParams({ search: v,page: "1" });
                
              }}
              inputValue={search} 
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search for a country..."
                  variant="filled"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                  }}
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 3,
                    width: { xs: "100%", sm: 300 },
                  }}
                />
              )}
            />

            {/* Favorites button */}
            <Tooltip title="Favorites">
              <IconButton component={Link} to="/favorites" color="inherit">
                <FavoriteBorderIcon />
              </IconButton>
            </Tooltip>

            {/* Filters button */}
            <Tooltip title="Filters">
              <IconButton
                onClick={() => setOpenFilters(true)}
                color={filtersActive ? "secondary" : "inherit"}
                sx={{ border: "1px solid rgba(255,255,255,0.6)" }}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Filter drawer panel */}
      <FilterDrawer
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        DrawerProps={{
          PaperProps: {
            sx: { width: { xs: "100%", sm: 360 } }, // Full width on xs, fixed 360px on sm+
          },
        }}
        region={region}
        setRegion={(v) => {
          setRegion(v);
          setPage(1);
        }}
        language={language}
        setLanguage={(v) => {
          setLanguage(v);
          setPage(1);
        }}
        regions={regions}
        languages={languages}
        onClear={() => {
          setRegion("All");
          setLanguage("All");
          setPage(1);
        }}
        onApply={() => setOpenFilters(false)}
      />

      {/* Country List Section */}
      <Box
        sx={{
          maxWidth: 1280,                 // Constrain max width
          mx: "auto",                     // Center horizontally
          px: { xs: 1, sm: 2, md: 4 },    
          pt: 4,
          pb: 8,
          bgcolor: theme.palette.primary.main + "AA",
          borderRadius: "0 0 16px 16px",
        }}
      >
        <center>
        {loading ? (
          /* Loading skeleton masonry */
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={180} />
            ))}
          </Masonry>
        ) : error ? (
          /* Error message */
          <Typography color="error" align="center">
            Error loading countries.
          </Typography>
        ) : filtered.length === 0 ? (
          /* No results message */
          <Typography align="center" variant="h6">
            No matches.
          </Typography>
        ) : (
          <>
            {/* Display paged country cards */}
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
              {paged.map((c) => (
                <CountryCard key={c.cca3} country={c} />
              ))}
            </Masonry>
            {/* Pagination controls */}
            {pageCount > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(_, v) => {
                  setSearchParams({
                    search,
                    page: v.toString(), // update URL page param
                  });
                }}
                color="primary"
              />
              </Box>
            )}
          </>
        )}

        </center>
      </Box>
    </Box>
  );
}
