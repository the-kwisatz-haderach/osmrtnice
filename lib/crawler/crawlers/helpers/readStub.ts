export default function getStubPath(name: string): string {
  return `file://${process.cwd()}/lib/crawler/crawlers/__stubs__/${name}.html`
}
