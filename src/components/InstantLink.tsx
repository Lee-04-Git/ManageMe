"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, MouseEvent, ReactNode } from "react";

interface InstantLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  title?: string;
}

/**
 * Optimized Link component for instant navigation with no delay
 * Uses React 19's startTransition for smooth, non-blocking navigation
 */
export default function InstantLink({
  href,
  children,
  className = "",
  prefetch = true,
  title,
}: InstantLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Use startTransition for non-blocking, instant navigation
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      prefetch={prefetch}
      title={title}
    >
      {children}
    </Link>
  );
}
