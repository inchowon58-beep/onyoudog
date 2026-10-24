export function PhilosophyProse({ paragraphs = [] }) {
  return (
    <div className="philosophy-prose">
      {paragraphs.map((paragraph, index) => (
        <p
          key={paragraph}
          className={index === 0 ? "is-lead" : index === paragraphs.length - 1 ? "is-note" : undefined}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function PhilosophySummary({ text }) {
  return <p className="philosophy-article__summary">{text}</p>;
}
