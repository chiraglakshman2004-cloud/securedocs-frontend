import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import apiService from "../services/api";

const CATEGORIES = ["events", "circulars", "documents", "rules", "regulations"];

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState("documents");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadSuccess(false);
    setUploadError("");

    if (!selectedFile) {
      setUploadError("Please select a file to upload.");
      return;
    }

    try {
      setLoading(true);
      const data = await apiService.uploadFile(selectedFile, { category, title, description });

      if (data.message) {
        setUploadSuccess(true);
        setFileName(selectedFile.name);
        setSelectedFile(null);
        setTitle("");
        setDescription("");
        setCategory("documents");
      } else {
        setUploadError(data.message || "Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError("Server error during upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Card>
        <CardHeader
          title={<Typography variant="h6" fontWeight={700}>Upload Document</Typography>}
          subheader={<Typography variant="body2" color="text.secondary">Securely upload files to your document vault</Typography>}
        />
        <CardContent>
          <Box component="form" onSubmit={handleUpload}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                >
                  <i className="bi bi-paperclip" style={{ marginRight: 8 }} />
                  {selectedFile ? selectedFile.name : "Choose file"}
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </Button>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Title (optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <i className="bi bi-type" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={6}
                  size="small"
                  label="Description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth disabled={loading}>
                  {loading ? "Uploading..." : "Upload"}
                </Button>
              </Grid>
            </Grid>
          </Box>

          {uploadSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <i className="bi bi-check-circle" style={{ marginRight: 8 }} />
              <strong>{fileName}</strong> uploaded successfully!
            </Alert>
          )}

          {uploadError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              <i className="bi bi-exclamation-triangle" style={{ marginRight: 8 }} />
              {uploadError}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Upload;
