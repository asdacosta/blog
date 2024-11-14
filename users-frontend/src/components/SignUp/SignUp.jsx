import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    pwd: "",
    pwdConfirm: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.pwd !== formData.pwdConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/sign-up", {
        email: formData.email,
        pwd: formData.pwd,
      });
      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      setError("Failed to create user. Try again.");
      console.error(error);
    }
  };

  return (
    <section className="signForm">
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            value={formData.pwd}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pwdConfirm">Confirm Password</label>
          <input
            type="password"
            name="pwdConfirm"
            id="pwdConfirm"
            value={formData.pwdConfirm}
            onChange={handleInputChange}
            required
          />
        </div>
        <button>Sign Up</button>
      </form>
    </section>
  );
}

export { SignUp };
