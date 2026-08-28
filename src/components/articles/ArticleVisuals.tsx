type FlowItem = {
  title: string;
  detail?: string;
};

export function ArticleFlowDiagram({
  caption,
  source,
  items,
  direction = "down",
}: {
  caption: string;
  source: string;
  items: FlowItem[];
  direction?: "down" | "out";
}) {
  return (
    <figure className="article-visual" aria-label={caption}>
      <figcaption>{caption}</figcaption>
      <div className="article-visual-source">{source}</div>
      <div className={direction === "out" ? "article-visual-branches" : "article-visual-stack"}>
        {items.map((item) => (
          <div className="article-visual-node" key={item.title}>
            <strong>{item.title}</strong>
            {item.detail && <span>{item.detail}</span>}
          </div>
        ))}
      </div>
    </figure>
  );
}

export function ArticleComparison({
  caption,
  beforeTitle,
  beforeItems,
  afterTitle,
  afterItems,
}: {
  caption: string;
  beforeTitle: string;
  beforeItems: string[];
  afterTitle: string;
  afterItems: string[];
}) {
  return (
    <figure className="article-visual" aria-label={caption}>
      <figcaption>{caption}</figcaption>
      <div className="article-comparison">
        <section>
          <h3>{beforeTitle}</h3>
          <ul>{beforeItems.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <span className="article-comparison-arrow" aria-hidden="true">→</span>
        <section>
          <h3>{afterTitle}</h3>
          <ul>{afterItems.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>
    </figure>
  );
}

