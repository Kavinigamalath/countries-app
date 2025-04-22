// src/pages/Home.jsx

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getAll } from "../api/restCountries";
import CountryCard from "../components/CountryCard";
import SpotlightCarousel from "../components/SpotlightCarousel";
import FilterDrawer from "../components/FilterDrawer";

import s1 from "../assets/services/service1.png";
import s2 from "../assets/services/service2.png";
import s3 from "../assets/services/service3.png";
import s4 from "../assets/services/service4.png";
import s5 from "../assets/services/service5.png";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Autocomplete,
  TextField,
  Drawer,
  Box,
  Pagination,
  Skeleton,
  useTheme,
  Tooltip,
  Stack,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import Masonry from "@mui/lab/Masonry";

const PAGE_SIZE = 24;
const serviceImages = [s1, s2, s3, s4, s5];

export default function Home() {
  const theme = useTheme();
  const { data: all, loading, error } = useFetch(getAll);

  const [openFilters, setOpenFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [language, setLanguage] = useState("All");
  const [page, setPage] = useState(1);

  const subregions = useMemo(
    () =>
      Array.from(
        new Set(
          all
            ?.map((c) => c.subregion)
            .filter((sr) => sr && sr !== "")
        )
      ).sort(),
    [all]
  );
  

  const regions = useMemo(
    () => Array.from(new Set(all?.map(c => c.region))).filter(Boolean).sort(),
    [all]
  );
  const languages = useMemo(() => {
    const s = new Set();
    all?.forEach(c =>
      Object.values(c.languages || {}).forEach(l => s.add(l))
    );
    return Array.from(s).sort();
  }, [all]);

  const filtered = useMemo(() => {
    if (!all) return [];
    return all.filter(c => {
      const nameMatch = c.name.common
        .toLowerCase()
        .includes(search.toLowerCase());
      const regionMatch = region === "All" || c.region === region;
      const langMatch =
        language === "All" ||
        Object.values(c.languages || {}).includes(language);
      return nameMatch && regionMatch && langMatch;
    });
  }, [all, search, region, language]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const filtersActive = region !== "All" || language !== "All";

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "transparent" }}>

     {/* Hero Banner */}
<Box
  sx={{
    width: "100%",
    mx: { xs: 0, sm: 2, md: 3 },
    mt: { xs: 2, sm: 3, md: 4 },
    mb: { xs: 3, sm: 4, md: 5 },
    px: { xs: 2, sm: 4 },
    py: { xs: 4, sm: 6 },
    borderRadius: 3,
    overflow: "hidden",
    background: `linear-gradient(135deg, ${theme.palette.primary.main}CC, ${theme.palette.primary.main}CC)`,
    color: "#FFF",
    textAlign: "center",
  }}
>
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

  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(2, 1fr)",
        sm: "repeat(5, 1fr)",
      },
      gap: 2,
      mt: 3,
      maxWidth: 800,
      mx: "auto",
    }}
  >
    {[
      ["Countries", all?.length || 0],
      ["Regions", regions.length],
      ["Subregions", subregions.length],
      ["Languages", languages.length],
      [
        "Population",
        all
          ? all.reduce((sum, c) => sum + (c.population || 0), 0).toLocaleString()
          : 0,
      ],
    ].map(([label, value], i) => (
      <Box
        key={i}
        sx={{
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(6px)",
          borderRadius: 2,
          p: 2,
        }}
      >
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
        <Toolbar
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            px: { xs: 2, sm: 4 },
            py: { xs: 1, sm: 0 },
          }}
        >
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
            <Autocomplete
              freeSolo
              options={[]}
              onInputChange={(_, v) => {
                setSearch(v);
                setPage(1);
              }}
              renderInput={params => (
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

            <Tooltip title="Favorites">
              <IconButton component={Link} to="/favorites" color="inherit">
                <FavoriteBorderIcon />
              </IconButton>
            </Tooltip>

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

      <FilterDrawer
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        // <-- Responsive full‑width on xs, 360px on sm+
        DrawerProps={{
          PaperProps: {
            sx: { width: { xs: "100%", sm: 360 } }
          }
        }}
        region={region}
        setRegion={(v) => { setRegion(v); setPage(1); }}
        language={language}
        setLanguage={(v) => { setLanguage(v); setPage(1); }}
        regions={regions}
        languages={languages}
        onClear={() => {
          setRegion("All");
          setLanguage("All");
          setPage(1);
        }}
        onApply={() => setOpenFilters(false)}
      />

      {/* Country List */}
      <Box
        sx={{
          maxWidth: 1280,
          mx: "auto",
          px: { xs: 1, sm: 2, md: 4 },
          pt: 4,
          pb: 8,
          bgcolor: theme.palette.primary.main + "AA",
          borderRadius: "0 0 16px 16px",
        }}
      >
        {loading ? (
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={180} />
            ))}
          </Masonry>
        ) : error ? (
          <Typography color="error" align="center">
            Error loading countries.
          </Typography>
        ) : filtered.length === 0 ? (
          <Typography align="center" variant="h6">
            No matches.
          </Typography>
        ) : (
          <>
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
              {paged.map(c => (
                <CountryCard key={c.cca3} country={c} />
              ))}
            </Masonry>
            {pageCount > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(_, v) => setPage(v)}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
