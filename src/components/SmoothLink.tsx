"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

interface SmoothLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
}

export default function SmoothLink({
  href,
  children,
  className = "",
  prefetch = true,
}: SmoothLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Instant navigation with prefetching
    router.push(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
}
