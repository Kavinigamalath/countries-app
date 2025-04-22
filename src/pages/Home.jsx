// src/pages/Home.jsx
import React, { useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import { getAll } from "../api/restCountries";
import CountryCard from "../components/CountryCard";

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
  Skeleton
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import Masonry from "@mui/lab/Masonry";

const PAGE_SIZE = 24;

export default function Home() {
  const { data: all, loading, error } = useFetch(getAll);

  // Use "All" as the no-filter sentinel
  const [openFilters, setOpenFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [language, setLanguage] = useState("All");
  const [page, setPage] = useState(1);

  // Derive unique lists
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

  // Filter with "All" bypass
  const filtered = useMemo(() => {
    if (!all) return [];
    return all.filter(c => {
      const nameMatch = c.name.common
        .toLowerCase()
        .includes(search.toLowerCase());

      const regionMatch =
        region === "All" ? true : c.region === region;

      const languageMatch =
        language === "All"
          ? true
          : Object.values(c.languages || {}).includes(language);

      return nameMatch && regionMatch && languageMatch;
    });
  }, [all, search, region, language]);

  // Pagination
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <Box className="bg-gray-50 min-h-screen pb-8">
      {/* AppBar */}
      <AppBar position="sticky" elevation={1}>
        <Toolbar className="justify-between">
          <Typography variant="h6">Explorer</Typography>
          <Box className="flex items-center space-x-2">
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
                  placeholder="Search countries..."
                  size="small"
                  sx={{ background: "#fff", borderRadius: 1, width: 240 }}
                />
              )}
            />
            <IconButton
              onClick={() => setOpenFilters(true)}
              color="inherit"
            >
              <FilterListIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Filters Drawer */}
      <Drawer
        anchor="right"
        open={openFilters}
        onClose={() => setOpenFilters(false)}
      >
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" mb={2}>
            Filters
          </Typography>

          {/* Region */}
          <Autocomplete
            options={["All", ...regions]}
            value={region}
            onChange={(_, v) => {
              setRegion(v || "All");
              setPage(1);
            }}
            renderInput={params => (
              <TextField
                {...params}
                label="Region"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            )}
          />

          {/* Language */}
          <Autocomplete
            options={["All", ...languages]}
            value={language}
            onChange={(_, v) => {
              setLanguage(v || "All");
              setPage(1);
            }}
            renderInput={params => (
              <TextField
                {...params}
                label="Language"
                variant="outlined"
              />
            )}
          />
        </Box>
      </Drawer>

      {/* Content */}
      <Box className="max-w-7xl mx-auto px-4 pt-6">
        {loading ? (
          <Masonry
            columns={{ xs: 2, sm: 3, md: 4, lg: 6 }}
            spacing={2}
          >
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={200}
              />
            ))}
          </Masonry>
        ) : error ? (
          <Typography color="error" align="center">
            Error loading countries.
          </Typography>
        ) : (
          <>
            <Masonry
              columns={{ xs: 2, sm: 3, md: 4, lg: 4 }}
              spacing={2}
            >
              {paged.map(c => (
                <CountryCard key={c.cca3} country={c} />
              ))}
            </Masonry>

            {pageCount > 1 && (
              <Box className="flex justify-center mt-6">
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
