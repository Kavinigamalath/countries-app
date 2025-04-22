// src/components/Footer.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  Divider,
  useTheme
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  ArrowUpward as ArrowUpwardIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon
} from "@mui/icons-material";

// Data-driven link arrays
const SECTIONS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Favorites", href: "/favorites" },
      { label: "Login", href: "/login" },
      { label: "Sample Detail", href: "/country/USA" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "REST Countries API", href: "https://restcountries.com" },
      { label: "Source Code", href: "https://github.com/YourUsername/countries-app" },
      { label: "Material‑UI Docs", href: "https://mui.com/" },
      { label: "Tailwind CSS", href: "https://tailwindcss.com/" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: GitHubIcon, label: "GitHub", href: "https://github.com/YourUsername" },
  { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com/in/YourProfile" },
  { icon: TwitterIcon, label: "Twitter", href: "#" },
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
];

export default function Footer() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (/\S+@\S+\.\S+/.test(email)) setSubscribed(true);
  };
  const handleScrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Box
      component="footer"
      role="contentinfo"
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
        color: theme.palette.primary.contrastText,
        pt: 8,
        pb: 4,
        mt: 16,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* About Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Countries Explorer
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              A high‑performance React SPA built with Vite and Material‑UI, fully
              integrated with the REST Countries API. Features:
            </Typography>
            {/* <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
              {[
                "Instant Autocomplete search",
                "Region & language filters",
                "Pagination + Masonry layout",
                "Session-based authentication",
                "Unit & integration tests",
                "Zero‑downtime Cloudflare Pages deployment",
              ].map((item, i) => (
                <Box component="li" key={i} sx={{ fontSize: "0.875rem", lineHeight: 1.4 }}>
                  {item}
                </Box>
              ))}
            </Box> */}
          </Grid>

          {/* Dynamic Link Sections */}
          {SECTIONS.map((section, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                {section.title}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {section.links.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    color="inherit"
                    underline="hover"
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {label}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Newsletter & Social */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
              Stay Updated
            </Typography>

            {subscribed ? (
              <Typography>🎉 Thanks for subscribing!</Typography>
            ) : (
              <Box component="form" noValidate sx={{ mt: 1, mb: 3 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Your email address"
                  variant="filled"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    borderRadius: 1,
                    mb: 1,
                  }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubscribe}
                  sx={{ textTransform: "none" }}
                >
                  Subscribe
                </Button>
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 1 }}>
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <IconButton
                  key={label}
                  aria-label={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    transition: "transform .2s",
                    "&:hover": { transform: "scale(1.2)" },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4, borderColor: theme.palette.primary.light }} />

        {/* Legal & Back‑to‑Top */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.75 }}>
            © {new Date().getFullYear()} Countries Explorer. All rights reserved.{" "}
            <Link href="/privacy" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Terms of Service
            </Link>
          </Typography>

          <IconButton
            onClick={handleScrollTop}
            aria-label="Back to top"
            sx={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
