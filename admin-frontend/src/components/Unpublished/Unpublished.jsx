import { content } from "./content";

function Unpublished() {
  return (
    <section>
      {content.map((article, index) => {
        <div key={index}>
          <span>User: {article.header}</span>
          <button>Publish</button>
        </div>;
      })}
    </section>
  );
}

export { Unpublished };
