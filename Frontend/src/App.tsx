import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';
import { Toaster, toast } from 'react-hot-toast';
import { checkConnectionStatus } from './utils/connectionStatus';

// Lazy-loaded Pages
const Home = React.lazy(() => import('./pages/Home'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const CodeEditor = React.lazy(() => import('./pages/Editor'));
const Challenges = React.lazy(() => import('./pages/Challenges'));
const Leaderboard = React.lazy(() => import('./pages/Leaderboard'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));

// Custom hook for connection status
const useConnectionStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = checkConnectionStatus((online) => {
      setIsOnline(online);
      if (!online) {
        toast.error('You are offline. Some features may be unavailable.');
      } else {
        toast.success('You are back online!');
      }
    });

    return () => unsubscribe();
  }, []);

  return isOnline;
};

const App: React.FC = () => {
  useConnectionStatus();

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/editor/:id" element={<CodeEditor />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
      <Toaster />
    </Provider>
  );
};

export default App;
