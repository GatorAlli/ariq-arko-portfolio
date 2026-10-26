export function EvidenceText({ text }: { text: string }) {
  const parts = text.split(/(\b(?:\d[\d,]*\+?|eight|six)\s+(?:community\s+|college\s+)?(?:visitors|participants|teams|students|projects|events)\b|\btop\s+20\b)/gi);
  return <>{parts.map((part, index) => index % 2 ? <strong className="evidence" key={index}>{part}</strong> : part)}</>;
}
