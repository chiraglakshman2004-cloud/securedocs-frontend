import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import apiService from "../services/api";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [userQuery, setUserQuery] = useState("");
  const [logQuery, setLogQuery] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const data = await apiService.getUsers();
      setUsers(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchLogs = async () => {
    try {
      setLoadingLogs(true);
      const data = await apiService.getActivityLogs();
      setLogs(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error("Error fetching logs:", err);
      setError("Failed to fetch logs");
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredUsers = useMemo(() => {
    const q = userQuery.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      [u.username, u.role].filter(Boolean).some((v) => String(v).toLowerCase().includes(q))
    );
  }, [users, userQuery]);

  const filteredLogs = useMemo(() => {
    const q = logQuery.trim().toLowerCase();
    if (!q) return logs;
    return logs.filter((l) =>
      [l.user, l.action, l.details]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [logs, logQuery]);

  const openConfirmDelete = (user) => {
    setUserToDelete(user);
    setConfirmOpen(true);
  };

  const closeConfirmDelete = () => {
    setConfirmOpen(false);
    setUserToDelete(null);
  };

  const deleteUser = async () => {
    if (!userToDelete) return;
    try {
      const data = await apiService.deleteUser(userToDelete._id);
      setSuccess(data.message || "User deleted");
      setUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
      setError("");
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user");
    } finally {
      closeConfirmDelete();
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const t = new Date(timestamp);
    const mins = Math.floor((now - t) / (1000 * 60));
    if (isNaN(mins)) return "";
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    return `${Math.floor(mins / 1440)}d ago`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Admin Panel
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage users and review recent activity
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Refresh data">
            <Button variant="outlined" onClick={() => { fetchUsers(); fetchLogs(); }}>
              <i className="bi bi-arrow-repeat" style={{ marginRight: 8 }} /> Refresh
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Global messages */}
      <Box sx={{ mb: 2 }}>
        {error && (
          <Alert severity="error" onClose={() => setError("")}>{error}</Alert>
        )}
        {success && (
          <Alert severity="success" onClose={() => setSuccess("")}>{success}</Alert>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Users */}
        <Grid item xs={12} md={7}>
          <Card elevation={1}>
            <CardHeader
              title={<Typography variant="h6" fontWeight={700}>User Management</Typography>}
              subheader={<Typography variant="body2" color="text.secondary">View, filter and remove users</Typography>}
            />
            <CardContent>
              <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search users by name or role"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i className="bi bi-search" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {loadingUsers ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                  <CircularProgress />
                </Box>
              ) : filteredUsers.length === 0 ? (
                <Box sx={{ textAlign: "center", color: "text.secondary", py: 6 }}>
                  <i className="bi bi-people" style={{ fontSize: 42 }} />
                  <Typography variant="h6" mt={1}>No users found</Typography>
                  <Typography variant="body2">Try adjusting your search</Typography>
                </Box>
              ) : (
                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user._id} hover>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Box sx={{ width: 28, height: 28, borderRadius: "50%", bgcolor: "primary.main", color: "primary.contrastText", display: "grid", placeItems: "center", fontSize: 14, fontWeight: 700 }}>
                                {(user.username || "U").slice(0, 1).toUpperCase()}
                              </Box>
                              <Typography>{user.username}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={user.role}
                              color={user.role === "admin" ? "warning" : "default"}
                              variant={user.role === "admin" ? "filled" : "outlined"}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Delete user">
                              <IconButton color="error" onClick={() => openConfirmDelete(user)}>
                                <i className="bi bi-trash" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Logs */}
        <Grid item xs={12} md={5}>
          <Card elevation={1}>
            <CardHeader
              title={<Typography variant="h6" fontWeight={700}>Recent Activity</Typography>}
              subheader={<Typography variant="body2" color="text.secondary">Monitor actions across the system</Typography>}
            />
            <CardContent>
              <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search activity by user or action"
                  value={logQuery}
                  onChange={(e) => setLogQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i className="bi bi-search" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {loadingLogs ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                  <CircularProgress />
                </Box>
              ) : filteredLogs.length === 0 ? (
                <Box sx={{ textAlign: "center", color: "text.secondary", py: 6 }}>
                  <i className="bi bi-clock-history" style={{ fontSize: 42 }} />
                  <Typography variant="h6" mt={1}>No activity logs</Typography>
                  <Typography variant="body2">Once actions occur, they will appear here</Typography>
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {filteredLogs.slice(0, 15).map((log) => (
                    <Box key={log._id} sx={{ display: "flex", gap: 2 }}>
                      <Box sx={{ color: "primary.main", pt: 0.5 }}>
                        <i className="bi bi-activity" />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <Typography variant="subtitle2" fontWeight={700}>{log.action}</Typography>
                          <Typography variant="caption" color="text.secondary">{formatTime(log.timestamp)}</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">by {log.user}</Typography>
                        {log.details && (
                          <Typography variant="body2" mt={0.5}>{log.details}</Typography>
                        )}
                        <Divider sx={{ mt: 2 }} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Confirm Deletion Dialog */}
      <Dialog open={confirmOpen} onClose={closeConfirmDelete}>
        <DialogTitle>Delete user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. Are you sure you want to delete
            {" "}
            <strong>{userToDelete?.username}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDelete}>Cancel</Button>
          <Button color="error" variant="contained" onClick={deleteUser}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminPanel;
