// src/components/SpotlightCarousel.jsx

/**
 * SpotlightCarousel
 * -----------------
 * Displays 5 images in a row: two small previews on the left, a large spotlight in the center,
 * and two small previews on the right. Auto-advances every `interval` ms, and users can
 * manually navigate with arrows or by clicking any preview.
 *
 * Props:
 * - images: string[]      // array of image URLs
 * - interval: number      // ms between auto-advances (default 20000)
 */

import React, { useState, useEffect, useCallback } from "react";      // Import React and hooks
import { Box, IconButton, useTheme } from "@mui/material";            // Import MUI components
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";        // Import left arrow icon
import ChevronRightIcon from "@mui/icons-material/ChevronRight";      // Import right arrow icon

export default function SpotlightCarousel({ images, interval = 4000 }) { // Define component with props and default interval
  const theme = useTheme();                                           // Access MUI theme for styling
  const [current, setCurrent] = useState(0);                          // State for the current spotlight index

  // Advance to the next image, wrapping back to start
  const next = useCallback(() => {
    setCurrent(i => (i + 1) % images.length);                        // Increment index modulo number of images
  }, [images.length]);

  // Go back to the previous image, wrapping to end if needed
  const prev = useCallback(() => {
    setCurrent(i => (i - 1 + images.length) % images.length);        // Decrement index with wrap-around
  }, [images.length]);

  // Set up auto-advance timer
  useEffect(() => {
    const id = setInterval(next, interval);                          // Start interval calling next()
    return () => clearInterval(id);                                  // Clean up on unmount or deps change
  }, [interval, next]);

  // Calculate the five visible slots: two before, current, two after
  const len = images.length;                                         // Total number of images
  const slots = [
    (current - 2 + len) % len,                                       // Two before current
    (current - 1 + len) % len,                                       // One before current
    current,                                                         // Current
    (current + 1) % len,                                             // One after current
    (current + 2) % len,                                             // Two after current
  ];

  return (
    <Box
      component="section"                                            // Semantic container
      sx={{
        position: "relative",                                        // Parent for absolute arrows
        width: "100%",                                               // Full width
        display: "flex",                                             // Arrange slots in a row
        alignItems: "center",                                        // Vertically center contents
        justifyContent: "center",                                    // Horizontally center contents
        overflow: "hidden",                                          // Hide overflowing parts
        gap: 2,                                                      // Space between slots
        mb: 4,                                                       // Margin bottom
        height: { xs: 200, md: 300 },                               // Responsive height
      }}
    >
      {/* Left navigation arrow */}
      <IconButton
        onClick={prev}                                               // Attach prev handler
        sx={{
          position: "absolute",                                      // Position over carousel
          left: 8,                                                   // Offset from left
          top: "50%",                                                // Vertical center
          transform: "translateY(-50%)",                            // Center exactly
          bgcolor: "#ffffffaa",                                      // Semi-transparent background
          "&:hover": { bgcolor: "#ffffff" },                         // Fully opaque on hover
          zIndex: 2,                                                 // Above images
          opacity: 0.7,                                              // Less emphasis
        }}
      >
        <ChevronLeftIcon />                                         {/* Render left arrow icon */}
      </IconButton>

      {/* Render the five image slots */}
      {slots.map((idx, slot) => {
        const isSpotlight = slot === 2;                              // Middle slot flag
        return (
          <Box
            key={idx}                                                // Unique key for react
            component="img"                                          // Render as image element
            src={images[idx]}                                        // Image source URL
            alt={`Slide ${idx + 1}`}                                 // Accessible alt text
            onClick={() => !isSpotlight && setCurrent(idx)}          // Click preview to focus
            sx={{
              flex: isSpotlight ? "0 0 40%" : "0 0 15%",             // Spotlight wider than previews
              height: "100%",                                        // Fill container height
              objectFit: isSpotlight ? "contain" : "cover",          // Contain spotlight, cover previews
              backgroundColor: isSpotlight ? theme.palette.grey[100] : "transparent", // Spotlight bg
              borderRadius: 2,                                       // Slight rounding
              cursor: isSpotlight ? "default" : "pointer",           // Pointer on clickable
              transition: "flex 0.6s ease, opacity 0.6s ease",       // Smooth resizing and fade
              boxShadow: isSpotlight
                ? `0 6px 16px ${theme.palette.grey[600]}`           // Drop shadow on spotlight
                : "none",
              opacity: isSpotlight ? 1 : 0.6,                        // Fade previews
            }}
          />
        );
      })}

      {/* Right navigation arrow */}
      <IconButton
        onClick={next}                                               // Attach next handler
        sx={{
          position: "absolute",                                      // Position over carousel
          right: 8,                                                  // Offset from right
          top: "50%",                                                // Vertical center
          transform: "translateY(-50%)",                            // Center exactly
          bgcolor: "#ffffffaa",                                      // Semi-transparent background
          "&:hover": { bgcolor: "#ffffff" },                         // Fully opaque on hover
          zIndex: 2,                                                 // Above images
          opacity: 0.7,                                              // Less emphasis
        }}
      >
        <ChevronRightIcon />                                        {/* Render right arrow icon */}
      </IconButton>
    </Box>
  );
}
