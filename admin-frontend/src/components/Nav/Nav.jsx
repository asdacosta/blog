import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">
        <h3>Home</h3>
      </Link>
      <section>
        <Link to="/new-post">
          <button>New Post</button>
        </Link>
        <Link to="/published">
          <button>Published</button>
        </Link>
        <Link to="/unpublished">
          <button>Unpublished</button>
        </Link>
        <Link to="/comments">
          <button>Comments</button>
        </Link>
      </section>
    </nav>
  );
}

export { Nav };
