import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASS_RX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const Register = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const reset = () =>
    setForm({ name: "", email: "", password: "", confirmPassword: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
    if (msg) setMsg("");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = form;

    if (name.trim().length < 3) {
      setMsg("Name must be at least 3 characters long.");
      return;
    }
    if (!EMAIL_RX.test(email)) {
      setMsg("Please enter a valid email address.");
      return;
    }
    if (!PASS_RX.test(password)) {
      setMsg(
        "Password must be at least 8 characters, include one uppercase letter, one number, and one special character."
      );
      return;
    }
    if (password !== confirmPassword) {
      setMsg("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 409) {
        setMsg("User already exists.");
        return;
      }
      if (!res.ok) {
        setMsg("Registration failed. Try again.");
        return;
      }

      reset();
      setMsg("User created successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Registration error:", err);
      setMsg("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <div className="background" />
      <form onSubmit={onSubmit}>
        <h3>Register Here</h3>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
        />

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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={onChange}
        />

        <button type="submit">Register</button>
        <div className="social">
          {msg && <p id="errorMessage">{msg}</p>}
          <br />
          <h4>
            <Link to="/login">Login</Link>
          </h4>
        </div>
      </form>
    </>
  );
};

export default Register;
