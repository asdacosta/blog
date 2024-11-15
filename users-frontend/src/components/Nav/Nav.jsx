import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav>
      <Link to="/">
        <h3>Blog</h3>
      </Link>
      <section>
        {isLoggedIn ? (
          <button onClick={handleLogOut}>Log Out</button>
        ) : (
          <>
            <Link to="/sign-in">
              <button>Sign In</button>
            </Link>
            <Link to="/sign-up">
              <button>Sign Up</button>
            </Link>
          </>
        )}
      </section>
    </nav>
  );
}

export { Nav };
