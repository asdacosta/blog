import axios from "axios";
import { useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/log-in", { email, pwd });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <section className="signForm">
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
        </div>
        <button>Sign In</button>
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
}

export { SignIn };
