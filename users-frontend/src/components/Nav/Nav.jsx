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
        <Link to="/sign-in">
          <button>Sign In</button>
        </Link>
        <Link to="/sign-up">
          <button>Sign Up</button>
        </Link>
      </section>
    </nav>
  );
}

export { Nav };
