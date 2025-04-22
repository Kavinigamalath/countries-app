// src/components/SpotlightCarousel.jsx

/**
 * SpotlightCarousel
 * -----------------
 * Displays 5 images in a row: two small previews on the left, a large spotlight in the center,
 * and two small previews on the right. Auto‑advances every `interval` ms, and users can
 * manually navigate with arrows or by clicking any preview.
 *
 * Props:
 * - images: string[]      // array of image URLs
 * - interval: number      // ms between auto‑advances (default 20000)
 */

import React, { useState, useEffect, useCallback } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function SpotlightCarousel({ images, interval = 4000 }) {
  const theme = useTheme();
  const [current, setCurrent] = useState(0);  // spotlight index

  // Move to the next image (wraps around)
  const next = useCallback(() => {
    setCurrent(i => (i + 1) % images.length);
  }, [images.length]);

  // Move to the previous image (wraps around)
  const prev = useCallback(() => {
    setCurrent(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto‑advance timer
  useEffect(() => {
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [interval, next]);

  // Compute the 5 indices: two before, current, two after
  const len = images.length;
  const slots = [
    (current - 2 + len) % len,
    (current - 1 + len) % len,
    current,
    (current + 1) % len,
    (current + 2) % len,
  ];

  return (
    <Box
      component="section"
      sx={{
        position: "relative",               // to position arrows
        width: "100%",                       // fill parent width
        display: "flex",                     // horizontal row
        alignItems: "center",                // vertical center
        justifyContent: "center",            // center row
        overflow: "hidden",                  // hide overflow
        gap: 2,                              // space between images
        mb: 4,                               // margin bottom
        height: { xs: 200, md: 300 },        // container height
      }}
    >
      {/* Left arrow (always semi‑visible) */}
      <IconButton
        onClick={prev}
        sx={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "#ffffffaa",
          "&:hover": { bgcolor: "#ffffff" },
          zIndex: 2,
          opacity: 0.7,
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      {/* Render 5 slots: two previews, one spotlight, two previews */}
      {slots.map((idx, slot) => {
        const isSpotlight = slot === 2;  // center slot
        return (
          <Box
            key={idx}
            component="img"
            src={images[idx]}
            alt={`Slide ${idx + 1}`}
            onClick={() => !isSpotlight && setCurrent(idx)}  // click preview to focus
            sx={{
              flex: isSpotlight ? "0 0 40%" : "0 0 15%",     // 40% for spotlight, 15% for previews
              height: "100%",                                // fill container height
              objectFit: isSpotlight ? "contain" : "cover",  // contain spotlight, cover previews
              backgroundColor: isSpotlight ? theme.palette.grey[100] : "transparent",
              borderRadius: 2,                               // rounded corners
              cursor: isSpotlight ? "default" : "pointer",
              transition: "flex 0.6s ease, opacity 0.6s ease",// smooth flex & opacity
              boxShadow: isSpotlight
                ? `0 6px 16px ${theme.palette.grey[600]}`    // depth for spotlight
                : "none",
              opacity: isSpotlight ? 1 : 0.6,                // fade previews
            }}
          />
        );
      })}

      {/* Right arrow */}
      <IconButton
        onClick={next}
        sx={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "#ffffffaa",
          "&:hover": { bgcolor: "#ffffff" },
          zIndex: 2,
          opacity: 0.7,
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}
