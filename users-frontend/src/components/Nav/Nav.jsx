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
        <button>Sign In</button>
        <button>Sign Up</button>
      </section>
    </nav>
  );
}

export { Nav };
