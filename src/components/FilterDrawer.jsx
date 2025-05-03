import React from "react"; // Import React to define components
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

// Import Material-UI components for styling and layout
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"; // Icon for back arrow
import ClearIcon from "@mui/icons-material/Clear"; // Icon for clear action

export default function FilterDrawer({ 
// Define FilterDrawer component receiving props
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
    // Drawer component for filter options
    <Drawer
      anchor="right" 
      open={open} 
      onClose={(e, reason) => { 
        if (reason === "backdropClick") return; 
        onClose(); 
      }}
      ModalProps={{ keepMounted: true }} 
      PaperProps={{
        sx: { width: { xs: 260, sm: 300 }, borderRadius: "16px 0 0 16px" }, 
      }}
    >
      {/* Drawer content */}
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}> {/* Container for back button and title */}
          <IconButton onClick={onClose}> {/* Button to close drawer */}
            <ArrowBackIosNewIcon /> {/* Back arrow icon */}
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1 }}> {/* Title styling */}
            Filters 
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} /> {/* Divider line with bottom margin */}

        {/* Clear + Apply Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}> {/* Container for action buttons */}
          <Button size="small" startIcon={<ClearIcon />} onClick={onClear}> {/* Clear filters button */}
            Clear 
          </Button>
          <Button size="small" variant="contained" onClick={onApply}> {/* Apply filters button */}
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