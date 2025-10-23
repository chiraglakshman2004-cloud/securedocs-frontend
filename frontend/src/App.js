import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  );
}

export default App;

// import "bootstrap/dist/css/bootstrap.min.css";

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Upload from "./pages/Upload";
// import ActivityLog from "./pages/ActivityLog";
// import AdminPanel from "./pages/AdminPanel";

// import AppRoutes from "./routes/AppRoutes";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/dashboard"
//           element={
//             <AppRoutes>
//               <Dashboard />
//             </AppRoutes>
//           }
//         />
//         <Route
//           path="/upload"
//           element={
//             <AppRoutes>
//               <Upload />
//             </AppRoutes>
//           }
//         />
//         <Route
//           path="/activity"
//           element={
//             <AppRoutes>
//               <ActivityLog />
//             </AppRoutes>
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             <AppRoutes>
//               <AdminPanel />
//             </AppRoutes>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
