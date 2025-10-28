# Page Transitions with Framer Motion

This project implements smooth fade-in and fade-out transitions between pages using Framer Motion.

## Overview

All pages in the app now have smooth transitions when navigating between routes. The implementation uses:

1. **PageTransition Component** - Global wrapper in root layout
2. **motion.main** - Individual page animations
3. **PageTransitionVariants Component** - Alternative transition styles

## Implementation

### 1. Global Page Transitions

The `PageTransition` component wraps all pages in `src/app/layout.tsx`:

```tsx
import PageTransition from "@/components/PageTransition";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
```

This provides automatic fade-in/fade-out transitions based on the URL pathname.

### 2. Individual Page Animations

Each page also uses `motion.main` for smoother content transitions:

```tsx
"use client";

import { motion } from "framer-motion";

export default function Page() {
  return (
    <motion.main
      className="flex-1 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page content */}
    </motion.main>
  );
}
```

## Transition Variants

The `PageTransitionVariants` component offers different animation styles:

### Available Variants

1. **fade** - Simple opacity transition
2. **slideUp** - Fade + slide from bottom
3. **slideRight** - Fade + slide from left
4. **scale** - Fade + scale effect

### Usage Example

```tsx
import PageTransitionVariants from "@/components/PageTransitionVariants";

export default function CustomPage() {
  return (
    <PageTransitionVariants variant="slideUp">
      <div className="content">{/* Your page content */}</div>
    </PageTransitionVariants>
  );
}
```

## Configuration

### Adjust Transition Duration

Modify the `duration` in the transition object:

```tsx
transition={{
  duration: 0.3, // Faster
  ease: "easeInOut"
}}
```

### Change Animation Style

Edit the variants in `PageTransition.tsx`:

```tsx
initial={{ opacity: 0, y: 20 }}    // Start state
animate={{ opacity: 1, y: 0 }}     // End state
exit={{ opacity: 0, y: -20 }}      // Exit state
```

## Transition Types Explained

| Variant      | Description                 | Best For                   |
| ------------ | --------------------------- | -------------------------- |
| `fade`       | Simple opacity change       | Minimal, clean transitions |
| `slideUp`    | Fades in while sliding up   | Content-heavy pages        |
| `slideRight` | Fades in from left to right | Sequential navigation      |
| `scale`      | Fades in with scale effect  | Modal-like transitions     |

## Performance Tips

1. **Use "use client"** - All pages with Framer Motion must be client components
2. **AnimatePresence mode="wait"** - Waits for exit animation before entering
3. **Keep transitions short** - 0.3-0.5s for best UX
4. **Avoid heavy animations** - Stick to opacity and transforms

## Pages Updated

All the following pages now have smooth transitions:

- ✅ Home (`/`)
- ✅ Projects (`/projects`)
- ✅ Profile (`/profile`)
- ✅ Favorites (`/favorites`)
- ✅ Messages (`/messages`)
- ✅ Reviews (`/reviews`)
- ✅ Settings (`/settings`)

## Future Enhancements

Consider adding:

1. **Route-specific transitions** - Different animations for different routes
2. **Gesture-based transitions** - Swipe to navigate
3. **Loading states** - Skeleton screens during transitions
4. **Page transition progress** - Use with nprogress for visual feedback
5. **Stagger animations** - Animate child elements sequentially

## Troubleshooting

### No transitions appearing

- Ensure the page is a client component (`"use client"`)
- Check that Framer Motion is installed
- Verify AnimatePresence is wrapping the content

### Janky animations

- Reduce transition duration
- Simplify animation properties
- Use `will-change` CSS property sparingly

### Content jumps

- Ensure consistent layout between pages
- Add `initial={false}` to AnimatePresence to skip initial animation
