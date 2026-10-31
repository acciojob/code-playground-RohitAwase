import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import './../styles/App.css';

import "./App.css";

// Login Page
function Login({ isAuthenticated, setIsAuthenticated }) {
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

// Private Route Component
function PrivateRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Home Page (Code Playground)
function Home({ setIsAuthenticated }) {
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h1>Code Playground</h1>
      <p>Welcome! You are authenticated.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

// Main App
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="main-container">

        <nav>
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/">Home</Link>
        </nav>

        <p>
          Authentication Status:{" "}
          <strong>
            {isAuthenticated ? "Logged In" : "Not Logged In"}
          </strong>
        </p>

        <Routes>
          <Route
            path="/login"
            element={
              <Login
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />

          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Home setIsAuthenticated={setIsAuthenticated} />
              </PrivateRoute>
            }
          />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;

