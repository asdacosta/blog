import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">
        <h3>Blog</h3>
      </Link>
      <section>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/signIn">
          <button>Sign In</button>
        </Link>
        <Link to="/signUp">
          <button>Sign Up</button>
        </Link>
      </section>
    </nav>
  );
}

export { Nav };
