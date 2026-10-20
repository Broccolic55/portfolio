import { useEffect, type RefObject } from 'react'

const blockedScrollKeys = new Set([' ', 'ArrowDown', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp'])

export default function useModalScrollLock(isOpen: boolean, openedAtScrollY: RefObject<number | null>) {
  useEffect(() => {
    if (!isOpen) return

    const root = document.documentElement
    const previousOverflow = root.style.overflow
    const previousScrollBehavior = root.style.scrollBehavior
    const originalScrollY = openedAtScrollY.current ?? window.scrollY

    const blockWheel = (event: WheelEvent) => event.preventDefault()
    const blockTouchScroll = (event: TouchEvent) => event.preventDefault()
    const blockScrollKey = (event: KeyboardEvent) => {
      if (blockedScrollKeys.has(event.key)) event.preventDefault()
    }

    root.style.overflow = 'hidden'
    window.addEventListener('wheel', blockWheel, { capture: true, passive: false })
    window.addEventListener('touchmove', blockTouchScroll, { capture: true, passive: false })
    window.addEventListener('keydown', blockScrollKey, true)

    return () => {
      root.style.overflow = previousOverflow
      root.style.scrollBehavior = 'auto'
      window.scrollTo(0, originalScrollY)
      window.requestAnimationFrame(() => {
        window.scrollTo(0, originalScrollY)
        root.style.scrollBehavior = previousScrollBehavior
      })
      window.removeEventListener('wheel', blockWheel, true)
      window.removeEventListener('touchmove', blockTouchScroll, true)
      window.removeEventListener('keydown', blockScrollKey, true)
      openedAtScrollY.current = null
    }
  }, [isOpen, openedAtScrollY])
}
