// src/components/FilterDrawer.jsx

import React from "react";
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  Divider,
  Button,
  FormControl,
  FormLabel,
  Autocomplete,
  TextField,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ClearIcon from "@mui/icons-material/Clear";

export default function FilterDrawer({
  open,
  onClose,
  region,
  setRegion,
  language,
  setLanguage,
  regions,
  languages,
  onClear,
  onApply,
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={(e, reason) => {
        // ignore backdrop clicks
        if (reason === "backdropClick") return;
        onClose();
      }}
      ModalProps={{ keepMounted: true }}
      PaperProps={{
        sx: { width: { xs: 260, sm: 300 }, borderRadius: "16px 0 0 16px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: 2,
          bgcolor: "background.paper",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <IconButton onClick={onClose}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Filters
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />

        {/* Clear + Apply */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Button size="small" startIcon={<ClearIcon />} onClick={onClear}>
            Clear
          </Button>
          <Button size="small" variant="contained" onClick={onApply}>
            Apply
          </Button>
        </Box>

        {/* Region Filter */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel>Region</FormLabel>
          <Autocomplete
            options={["All", ...regions]}
            value={region}
            onChange={(_, v) => setRegion(v || "All")}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormControl>

        {/* Language Filter */}
        <FormControl fullWidth>
          <FormLabel>Language</FormLabel>
          <Autocomplete
            options={["All", ...languages]}
            value={language}
            onChange={(_, v) => setLanguage(v || "All")}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormControl>
      </Box>
    </Drawer>
  );
}
