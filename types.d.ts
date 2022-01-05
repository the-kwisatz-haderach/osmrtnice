export {}
declare global {
  interface Window {
    IntersectionObserver: typeof IntersectionObserver
    FB: {
      ui: (options: { display: string; method: string; href: string }) => void
    }
  }
}
