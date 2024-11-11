import { content } from "./content";

function Published() {
  return (
    <section>
      {content.map((article, index) => {
        <div key={index}>
          <span>User: {article.header}</span>
          <button>Unpublish</button>
        </div>;
      })}
    </section>
  );
}

export { Published };
