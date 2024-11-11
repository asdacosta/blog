import { content } from "./content";

function Comments() {
  return (
    <section>
      {content.map((article, index) => {
        <div key={index}>
          <span>User: {article.header}</span>
          {article.comments.map((comment) => {
            <div>
              <span>Username: {comment.user}</span>
              <span>Comment: {comment.comment}</span>
              <button>Delete</button>
            </div>;
          })}
        </div>;
      })}
    </section>
  );
}

export { Comments };
