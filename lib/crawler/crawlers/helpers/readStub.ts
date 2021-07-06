export default function getStubPath(name: string): string {
  return `file://${process.cwd()}/src/crawlers/__stubs__/${name}.html`
}
