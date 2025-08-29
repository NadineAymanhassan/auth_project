import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Credentials {
  email: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<Credentials>({ email: "", password: "" });
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (notice) setNotice("");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setNotice("Please fill all the fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (!res.ok) {
        setNotice("Email or Password is incorrect");
        return;
      }

      const result = await res.json();
      setNotice("Login Succesful");
      localStorage.setItem("token", result.access_token);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setNotice("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <div className="background" />
      <form onSubmit={onSubmit}>
        <h3>Login</h3>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />

        <button type="submit">Log In</button>
        <div className="social">
          {notice && <p>{notice}</p>}
          <h4><Link to="/register">Register</Link></h4>
        </div>
      </form>
    </>
  );
};

export default Login;
