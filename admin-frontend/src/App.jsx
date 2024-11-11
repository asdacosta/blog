import "./App.css";

function App() {
  return (
    <>
      <h2>Published Posts</h2>
      <button>Unpublish</button>
      <h2>Unpublished Posts</h2>
      <button>Publish</button>
      <form action="">
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" required />
        </div>
        <div>
          <label htmlFor="message"></label>
          <input type="text" name="message" id="message" required />
        </div>
        <button>Post</button>
      </form>
    </>
  );
}

export default App;
