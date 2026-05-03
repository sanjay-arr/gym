import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CustomerList from './pages/CustomerList';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/customers" 
              element={
                <ProtectedRoute>
                  <CustomerList />
                </ProtectedRoute>
              } 
            />
            {/* Fallback routes for trainers and subscriptions can be added similarly */}
            <Route path="*" element={<div style={{ textAlign: 'center', padding: '100px' }}><h1>404</h1><p>Page not found</p></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
