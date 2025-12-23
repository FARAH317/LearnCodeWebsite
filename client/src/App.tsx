import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Pages
import Landing from './pages/other/Landing';
import Login from './pages/other/Login';
import Register from './pages/other/Register';
import Dashboard from './pages/other/Dashboard';
import Courses from './pages/learncode/Courses';
import CourseDetail from './pages/learncode/CourseDetail';
import Lesson from './pages/learncode/Lesson';
import Profile from './pages/learncode/Profile';
import Challenges from './pages/learncode/Challenges';
import ChallengeDetail from './pages/learncode/ChallengeDetail';
import Leaderboard from './pages/learncode/Leaderboard';

// Roadmap Pages
import RoadmapHome from './pages/roadmap/RoadmapHome';
import MyRoadmaps from './pages/roadmap/MyRoadmaps';
import Explore from './pages/roadmap/Explore';
import CreateRoadmap from './pages/roadmap/CreateRoadmap';
import ViewRoadmap from './pages/roadmap/ViewRoadmap';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Course routes */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons/:id"
          element={
            <ProtectedRoute>
              <Lesson />
            </ProtectedRoute>
          }
        />
        
        {/* Challenge routes */}
        <Route
          path="/challenges"
          element={
            <ProtectedRoute>
              <Challenges />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenges/:id"
          element={
            <ProtectedRoute>
              <ChallengeDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenges/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        
        {/* Roadmap routes */}
        <Route
          path="/roadmaps"
          element={
            <ProtectedRoute>
              <RoadmapHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roadmaps/my-roadmaps"
          element={
            <ProtectedRoute>
              <MyRoadmaps />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roadmaps/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roadmaps/create"
          element={
            <ProtectedRoute>
              <CreateRoadmap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roadmaps/:id"
          element={
            <ProtectedRoute>
              <ViewRoadmap />
            </ProtectedRoute>
          }
        />
        
        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;