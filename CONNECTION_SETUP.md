# SecureDocs Portal - Frontend-Backend Connection Setup

## Overview
This document outlines the proper connection between the frontend and backend, especially for file upload functionality.

## What Was Fixed

### 1. Missing Models
- ✅ Created `backend/models/Document.js` - Handles file metadata
- ✅ Created `backend/models/ActivityLog.js` - Tracks user activities

### 2. Server Configuration
- ✅ Fixed duplicate route definitions in `backend/server.js`
- ✅ Organized routes properly:
  - `/upload` - File upload endpoint
  - `/files` - File management
  - `/activity` - Activity logs
  - `/admin` - Admin functions
  - `/uploads` - Static file serving

### 3. Frontend API Integration
- ✅ Created `frontend/src/services/api.js` - Centralized API service
- ✅ Updated all components to use the API service:
  - `Upload.jsx` - File upload with proper error handling
  - `UploadedFiles.jsx` - File listing with download functionality
  - `Login.jsx` - Proper authentication
  - `ActivityLog.jsx` - Real-time activity tracking
  - `AdminPanel.jsx` - Admin functions

### 4. File Upload Flow
```
Frontend (Upload.jsx) 
    ↓ FormData with file
API Service (api.js)
    ↓ POST /upload
Backend (uploadRoutes.js)
    ↓ Multer processing
Document Model (Document.js)
    ↓ Save to database
ActivityLog Model (ActivityLog.js)
    ↓ Log the activity
Response to Frontend
```

## How to Test the Connection

### 1. Start the Backend
```bash
cd backend
npm install
npm start
```
The server should start on `http://localhost:5000`

### 2. Start the Frontend
```bash
cd frontend
npm install
npm start
```
The frontend should start on `http://localhost:3000`

### 3. Test File Upload
1. Open `http://localhost:3000`
2. Navigate to `/login` and login with credentials
3. Go to `/upload` and upload a file
4. Check `/files` to see uploaded files
5. Check `/activity-log` to see the upload activity

## API Endpoints

### Authentication
- `POST /login` - User login
- `POST /auth/register` - User registration

### File Management
- `POST /upload` - Upload file (requires auth)
- `GET /files` - List files (requires auth)
- `GET /uploads/:filename` - Download file

### Activity & Admin
- `GET /activity` - Get activity logs (requires auth)
- `GET /admin/users` - Get users (admin only)
- `DELETE /admin/users/:id` - Delete user (admin only)

## Key Features Implemented

### File Upload
- ✅ Proper FormData handling
- ✅ Authentication token in headers
- ✅ File validation and error handling
- ✅ Progress feedback to user

### File Management
- ✅ List uploaded files with metadata
- ✅ Download functionality
- ✅ File type and size information

### Activity Tracking
- ✅ Real-time activity logs
- ✅ Upload tracking
- ✅ User action logging

### Error Handling
- ✅ Network error handling
- ✅ Authentication error handling
- ✅ File upload error handling
- ✅ User-friendly error messages

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Make sure backend has `cors()` middleware enabled
   - Check that frontend is calling the correct backend URL

2. **Authentication Errors**
   - Ensure token is stored in localStorage
   - Check that Authorization header is included in requests

3. **File Upload Errors**
   - Verify multer configuration
   - Check uploads directory exists
   - Ensure file size limits are appropriate

4. **Database Connection**
   - Verify MongoDB is running
   - Check connection string in environment variables

### Testing Commands

```bash
# Test backend health
curl http://localhost:5000/ping

# Test file upload (replace with actual token)
curl -X POST http://localhost:5000/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@test.txt"
```

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/securechat
PORT=5000
JWT_SECRET=your-secret-key
```

### Frontend
The frontend uses the API_BASE_URL in `src/services/api.js` (default: http://localhost:5000)

## File Structure
```
SecureDocsPortal/
├── backend/
│   ├── models/
│   │   ├── Document.js ✅
│   │   ├── ActivityLog.js ✅
│   │   ├── User.js
│   │   └── File.js
│   ├── routes/
│   │   ├── uploadRoutes.js ✅
│   │   ├── fileRoutes.js
│   │   ├── activity.js ✅
│   │   └── ...
│   └── server.js ✅
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js ✅
│   │   ├── pages/
│   │   │   ├── Upload.jsx ✅
│   │   │   ├── UploadedFiles.jsx ✅
│   │   │   ├── Login.jsx ✅
│   │   │   ├── ActivityLog.jsx ✅
│   │   │   └── AdminPanel.jsx ✅
│   │   └── ...
│   └── ...
└── CONNECTION_SETUP.md ✅
```

## Success Indicators

✅ Backend server starts without errors
✅ Frontend connects to backend API
✅ File upload works end-to-end
✅ Files appear in the files list
✅ Activity logs show upload events
✅ Download functionality works
✅ Authentication works properly
✅ Error handling works correctly

The frontend and backend are now properly connected with full file upload functionality!
