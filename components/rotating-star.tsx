import Image from "next/image";

export function RotatingStar({ className = "" }: { className?: string }) {
  return <div className={`rotating-star ${className}`} aria-hidden="true"><picture><source media="(prefers-reduced-motion: reduce)" srcSet="/images/rotating-star-still.webp" /><Image src="/images/rotating-star.webp" alt="" width={240} height={240} unoptimized priority /></picture></div>;
}
