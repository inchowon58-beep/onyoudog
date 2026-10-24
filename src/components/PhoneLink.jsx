import { PHONE, PHONE_TEL } from "../data/site.js";

export function PhoneLink({ className = "phone-link", children }) {
  return (
    <a className={className} href={PHONE_TEL}>
      {children ?? PHONE}
    </a>
  );
}

export function TextWithPhone({ text, className }) {
  if (!text?.includes(PHONE)) {
    return className ? <span className={className}>{text}</span> : text;
  }
  const parts = text.split(PHONE);
  return (
    <span className={className}>
      {parts.map((part, index) => (
        <span key={`${index}-${part.slice(0, 8)}`}>
          {part}
          {index < parts.length - 1 ? <PhoneLink /> : null}
        </span>
      ))}
    </span>
  );
}
