import { useEffect } from 'react'

export function useKeyboard(
  key: string,
  handler: (event: KeyboardEvent) => void,
  dependencies: any[] = []
) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === key) {
        handler(event)
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, dependencies)
}

export function useEscapeKey(handler: () => void) {
  useKeyboard('Escape', handler)
}