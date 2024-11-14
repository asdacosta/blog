import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const loggedIn = !!localStorage.getItem("token");
    setToken(loggedIn);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setToken(false);
  };

  return (
    <nav>
      <Link to="/">
        <h3>Blog</h3>
      </Link>
      <section>
        {token ? (
          <>
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/sign-in">
              <button>Sign In</button>
            </Link>
            <Link to="/sign-up">
              <button>Sign Up</button>
            </Link>
          </>
        ) : (
          <button onClick={handleLogOut}>Log Out</button>
        )}
      </section>
    </nav>
  );
}

export { Nav };
