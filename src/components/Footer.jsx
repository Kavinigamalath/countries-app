// Footer component for the Country Explorer app
import React, { useState } from "react";

// Import Material-UI components and icons
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

// Import icons for social media links
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  ArrowUpward as ArrowUpwardIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon
} from "@mui/icons-material";

// Define two arrays of link data: one for main sections, one for social icons
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
      { label: "REST Countries API", href: "https://restcountries.com" },
      { label: "Source Code", href: "https://github.com/YourUsername/countries-app" },
      { label: "Material-UI Docs", href: "https://mui.com/" },
      { label: "Tailwind CSS", href: "https://tailwindcss.com/" },
    ],
  },
];

// Define social media links with icons and URLs
const SOCIAL_LINKS = [
  { icon: GitHubIcon, label: "GitHub", href: "https://github.com/kavinigamalath" },
  { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com/in/kavinigamalath" },
  { icon: TwitterIcon, label: "Twitter", href: "#" },
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
];

export default function Footer() {
  // grab theme object for consistent styling
  const theme = useTheme();

  // local state for email input and subscription flag
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // basic email validation: if valid, show thank-you message
  const handleSubscribe = () => {
    if (/\S+@\S+\.\S+/.test(email)) setSubscribed(true);
  };

  // smooth scroll back to top
  const handleScrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    // semantic footer element, with gradient background
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
            {/* App name and description */}
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Country Explorer
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              A high-performance React SPA built with Vite and Material-UI, fully
              integrated with the REST Countries API. Features:
            </Typography>
          </Grid>

          {/* Map over SECTIONS to render link columns */}
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

          {/* Newsletter signup & social icons */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
              Stay Updated
            </Typography>

            {/* Toggle between input form and thank-you text */}
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

            {/* Render social media buttons */}
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

        {/* Divider before legal section */}
        <Divider sx={{ my: 4, borderColor: theme.palette.primary.light }} />

        {/* Legal links and back-to-top */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Legal links */}
          <Typography variant="caption" sx={{ opacity: 0.75 }}>
            © {new Date().getFullYear()} Country Explorer. All rights reserved.{" "}
            <Link href="/privacy" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Terms of Service
            </Link>
          </Typography>

          {/* Scroll-to-top button */}
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
