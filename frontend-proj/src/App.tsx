// App.tsx
import { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<h1>404 Not Found</h1>} />
      <Route element={<Protected />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

const Protected = () => {
  const [pending, setPending] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const run = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:3000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuthed(res.ok);
      } catch {
        setAuthed(false);
      } finally {
        setPending(false);
      }
    };
    run();
  }, []);

  if (pending) return <div>Loading...</div>;
  return authed ? <Outlet /> : <Navigate to="/login" replace />;
};

export default App;
