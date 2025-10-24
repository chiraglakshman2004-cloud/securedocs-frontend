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
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
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

function UploadedFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("date_desc");
  const [category, setCategory] = useState("");

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const data = await apiService.getFiles({ category: category || undefined });
      setFiles(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error("Error fetching files:", err);
      setError("Failed to fetch files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleDownload = async (filename) => {
    try {
      const response = await apiService.downloadFile(filename);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download error:", err);
      setError("Download failed");
    }
  };

  const formatTime = (ts) => {
    try {
      return new Date(ts).toLocaleString();
    } catch (e) {
      return "";
    }
  };

  const getExt = (name = "") => {
    const idx = name.lastIndexOf(".");
    return idx > -1 ? name.slice(idx + 1).toLowerCase() : "";
  };

  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = files;
    if (q) {
      list = list.filter((f) =>
        [f.originalname, f.uploader, f.mimetype]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(q))
      );
    }
    switch (sortBy) {
      case "name_asc":
        list = [...list].sort((a, b) => (a.originalname || "").localeCompare(b.originalname || ""));
        break;
      case "name_desc":
        list = [...list].sort((a, b) => (b.originalname || "").localeCompare(a.originalname || ""));
        break;
      case "date_asc":
        list = [...list].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "date_desc":
      default:
        list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
    return list;
  }, [files, query, sortBy]);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Files
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Browse, search and download uploaded documents
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Refresh list">
            <Button variant="outlined" onClick={fetchFiles}>
              <i className="bi bi-arrow-repeat" style={{ marginRight: 8 }} /> Refresh
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Global message */}
      <Box sx={{ mb: 2 }}>
        {error && (
          <Alert severity="error" onClose={() => setError("")}>{error}</Alert>
        )}
      </Box>

      <Card elevation={1}>
        <CardHeader
          title={<Typography variant="h6" fontWeight={700}>Uploaded Documents</Typography>}
          subheader={<Typography variant="body2" color="text.secondary">{filteredSorted.length} items</Typography>}
        />
        <CardContent>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by file name, uploader or type"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="bi bi-search" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                fullWidth
                size="small"
                value={category}
                displayEmpty
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value=""><em>All categories</em></MenuItem>
                <MenuItem value="events">events</MenuItem>
                <MenuItem value="circulars">circulars</MenuItem>
                <MenuItem value="documents">documents</MenuItem>
                <MenuItem value="rules">rules</MenuItem>
                <MenuItem value="regulations">regulations</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={2}>
              <Select
                fullWidth
                size="small"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="date_desc">Newest</MenuItem>
                <MenuItem value="date_asc">Oldest</MenuItem>
                <MenuItem value="name_asc">Name A→Z</MenuItem>
                <MenuItem value="name_desc">Name Z→A</MenuItem>
              </Select>
            </Grid>
          </Grid>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : filteredSorted.length === 0 ? (
            <Box sx={{ textAlign: "center", color: "text.secondary", py: 8 }}>
              <i className="bi bi-folder-x" style={{ fontSize: 42 }} />
              <Typography variant="h6" mt={1}>No files found</Typography>
              <Typography variant="body2">Try uploading or adjust your search</Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>File</TableCell>
                    <TableCell>Uploader</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Uploaded</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSorted.map((file) => (
                    <TableRow key={file._id} hover>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                          <Box sx={{ color: "primary.main" }}>
                            <i className="bi bi-file-earmark-text" />
                          </Box>
                          <Typography noWrap maxWidth={400} title={file.originalname}>
                            {file.originalname}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip size="small" label={file.uploader || "-"} variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip
                            size="small"
                            label={file.category || 'documents'}
                            color={file.category === 'events' ? 'warning' : 'default'}
                            variant={file.category === 'events' ? 'filled' : 'outlined'}
                          />
                          <Chip
                            size="small"
                            label={getExt(file.originalname) || file.mimetype || "file"}
                            variant="outlined"
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {formatTime(file.createdAt)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Download">
                          <IconButton color="primary" onClick={() => handleDownload(file.filename)}>
                            <i className="bi bi-download" />
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
    </Container>
  );
}

export default UploadedFiles;
