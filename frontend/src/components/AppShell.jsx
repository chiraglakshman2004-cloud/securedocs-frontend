import React, { useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  Tooltip,
  Avatar,
  Button,
  styled,
} from "@mui/material";

// Note: We intentionally use bootstrap-icons for icons to avoid adding a new dependency.
// You can swap these for @mui/icons-material if you choose to add it later.

const drawerWidth = 260;

const Brand = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  textDecoration: "none",
  color: theme.palette.text.primary,
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create(["margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  [theme.breakpoints.up("md")]: {
    marginLeft: open ? drawerWidth : 0,
  },
}));

const AppShell = ({ children }) => {
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

  const menu = useMemo(() => {
    const items = [
      { label: "Dashboard", icon: "bi-speedometer2", to: "/dashboard", auth: true },
      { label: "Upload", icon: "bi-cloud-upload", to: "/upload", auth: true },
      { label: "Files", icon: "bi-folder2", to: "/files", auth: true },
      { label: "Activity Log", icon: "bi-clock-history", to: "/activity-log", auth: true },
    ];
    if (role === "admin") {
      items.push({ label: "Admin Panel", icon: "bi-gear", to: "/admin-panel", auth: true });
    }
    return items;
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Brand to={token ? "/dashboard" : "/"}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontWeight: 800,
              letterSpacing: 0.5,
            }}
          >
            S
          </Box>
          <Typography variant="h6" fontWeight={800}>
            SecureDocs
          </Typography>
        </Brand>
      </Box>
      <Divider />
      <List sx={{ px: 1 }}>
        {menu.map((item) => (
          <ListItemButton
            key={item.to}
            component={NavLink}
            to={item.to}
            selected={location.pathname === item.to}
            sx={{
              my: 0.5,
              borderRadius: 2,
              '&.Mui-selected': {
                bgcolor: (t) => t.palette.primary.main + '22',
              },
            }}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <i className={`bi ${item.icon}`} style={{ fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      {token && (
        <Box sx={{ p: 2, pt: 0 }}>
          <Button fullWidth variant="outlined" color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        elevation={0}
        color="transparent"
        sx={{
          backdropFilter: "saturate(130%) blur(10px)",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
          bgcolor: (t) => (t.palette.mode === "dark" ? "rgba(17,24,39,0.7)" : "rgba(255,255,255,0.7)"),
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {token && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen((v) => !v)}
              sx={{ display: { md: "none" }, mr: 1 }}
            >
              <i className="bi bi-list" />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ fontWeight: 800, flexGrow: 1 }}>
            {(() => {
              const path = location.pathname;
              if (path.startsWith("/dashboard")) return "Dashboard";
              if (path.startsWith("/upload")) return "Upload";
              if (path.startsWith("/files")) return "Files";
              if (path.startsWith("/activity-log")) return "Activity Log";
              if (path.startsWith("/admin-panel")) return "Admin Panel";
              if (path.startsWith("/login")) return "Login";
              return "SecureDocs";
            })()}
          </Typography>

          {/* Right side actions */}
          {token ? (
            <Tooltip title={localStorage.getItem("username") || "User"}>
              <Avatar sx={{ width: 34, height: 34 }}>
                {(localStorage.getItem("username") || "U").slice(0, 1).toUpperCase()}
              </Avatar>
            </Tooltip>
          ) : (
            <Button component={Link} to="/login" variant="contained" size="small">
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Side navigation */}
      {token && (
        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="sidebar">
          {/* Temporary drawer for mobile */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
            }}
          >
            {drawer}
          </Drawer>
          {/* Permanent drawer for desktop */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}

      <Main open={token && isDesktop}>
        <Toolbar />
        {children}
      </Main>
    </Box>
  );
};

export default AppShell;
