export function SeoFold({ children, className = "" }) {
  return (
    <div className={`seo-shell ${className}`.trim()}>
      <details className="seo-fold">
        <summary aria-label="메인 화면 펼치기">
          <span className="seo-toggle" />
        </summary>
        <div className="seo-fold__body">{children}</div>
      </details>
    </div>
  );
}
