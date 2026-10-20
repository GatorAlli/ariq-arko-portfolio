import { cn } from "@/lib/utils";

export function PhotoPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div role="img" aria-label={`${label}, photo coming soon`} className={cn("photo-placeholder", className)}>
      <span className="photo-corner corner-tl" /><span className="photo-corner corner-tr" />
      <span className="photo-corner corner-bl" /><span className="photo-corner corner-br" />
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true"><rect x="5" y="7" width="32" height="28" rx="2" stroke="currentColor" /><circle cx="15" cy="17" r="3" stroke="currentColor" /><path d="m6 31 10-9 7 6 7-12 7 10" stroke="currentColor" /></svg>
      <span className="photo-label">{label}</span>
      <span className="photo-caption">IMAGE TO BE ADDED</span>
    </div>
  );
}
