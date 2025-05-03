// Description: A responsive image carousel component that displays a spotlight image with two previews on either side. It auto-advances through the images and allows manual navigation with arrows.
import React, { useState, useEffect, useCallback } from "react";      
import { Box, IconButton, useTheme } from "@mui/material";            
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";        
import ChevronRightIcon from "@mui/icons-material/ChevronRight";      

// Description: A responsive image carousel component that displays a spotlight image with two previews on either side. It auto-advances through the images and allows manual navigation with arrows.
export default function SpotlightCarousel({ images, interval = 4000 }) { 
  const theme = useTheme();                                           
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
    // Main container for the carousel
    <Box
      component="section"                                            
      sx={{
        position: "relative",                                        
        width: "100%",                                               
        display: "flex",                                             
        alignItems: "center",                                        
        justifyContent: "center",                                    
        overflow: "hidden",                                          
        gap: 2,                                                      
        mb: 4,                                                       
        height: { xs: 200, md: 300 },                               
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
        <ChevronLeftIcon />                                         
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
        <ChevronRightIcon />                                        
      </IconButton>
    </Box>
  );
}
