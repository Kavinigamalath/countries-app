import React from "react"; // Import React to define components
import {
  Drawer, // MUI Drawer component for slide-in panel
  Box, // MUI Box as a generic container for layout
  IconButton, // MUI IconButton for icon-based button
  Typography, // MUI Typography for styled text
  Divider, // MUI Divider for horizontal line separation
  Button, // MUI Button for clickable actions
  FormControl, // MUI FormControl to group form elements
  FormLabel, // MUI FormLabel to label form controls
  Autocomplete, // MUI Autocomplete for selectable/dropdown input
  TextField, // MUI TextField for input fields
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"; // Icon for back arrow
import ClearIcon from "@mui/icons-material/Clear"; // Icon for clear action

export default function FilterDrawer({ // Define FilterDrawer component receiving props
  open, // Boolean to control drawer visibility
  onClose, // Callback when drawer should close
  region, // Current selected region value
  setRegion, // Setter function to update region
  language, // Current selected language value
  setLanguage, // Setter function to update language
  regions, // Array of available region options
  languages, // Array of available language options
  onClear, // Callback to clear filters
  onApply, // Callback to apply filters
}) {
  return (
    <Drawer
      anchor="right" // Position drawer on the right side
      open={open} // Control open state via prop
      onClose={(e, reason) => { // Handle close events
        if (reason === "backdropClick") return; // Ignore clicks outside the drawer
        onClose(); // Call provided onClose callback
      }}
      ModalProps={{ keepMounted: true }} // Keep drawer mounted in DOM when closed
      PaperProps={{
        sx: { width: { xs: 260, sm: 300 }, borderRadius: "16px 0 0 16px" }, // Set width and rounded corners
      }}
    >
      <Box
        sx={{
          display: "flex", // Use flexbox layout
          flexDirection: "column", // Stack children vertically
          height: "100%", // Full height of drawer
          p: 2, // Padding around content
          bgcolor: "background.paper", // Background color from theme
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}> {/* Container for back button and title */}
          <IconButton onClick={onClose}> {/* Button to close drawer */}
            <ArrowBackIosNewIcon /> {/* Back arrow icon */}
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1 }}> {/* Title styling */}
            Filters {/* Title text */}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} /> {/* Divider line with bottom margin */}

        {/* Clear + Apply Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}> {/* Container for action buttons */}
          <Button size="small" startIcon={<ClearIcon />} onClick={onClear}> {/* Clear filters button */}
            Clear {/* Button label */}
          </Button>
          <Button size="small" variant="contained" onClick={onApply}> {/* Apply filters button */}
            Apply {/* Button label */}
          </Button>
        </Box>

        {/* Region Filter */}
        <FormControl fullWidth sx={{ mb: 3 }}> {/* Group for region filter */}
          <FormLabel>Region</FormLabel> {/* Label for region */}
          <Autocomplete
            options={["All", ...regions]} // Include 'All' plus regions array
            value={region} // Current selected value
            onChange={(_, v) => setRegion(v || "All")} // Update region on change
            renderInput={(params) => <TextField {...params} />} // Render input field
          />
        </FormControl>

        {/* Language Filter */}
        <FormControl fullWidth> {/* Group for language filter */}
          <FormLabel>Language</FormLabel> {/* Label for language */}
          <Autocomplete
            options={["All", ...languages]} // Include 'All' plus languages array
            value={language} // Current selected value
            onChange={(_, v) => setLanguage(v || "All")} // Update language on change
            renderInput={(params) => <TextField {...params} />} // Render input field
          />
        </FormControl>
      </Box>
    </Drawer>
  ); // Return the complete drawer component
}