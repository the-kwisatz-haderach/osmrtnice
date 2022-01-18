export type Optional<T, U extends keyof T> = Required<Omit<T, U>> &
  Partial<Pick<T, U>>

export type Awaited<T> = T extends Promise<infer U> ? U : T
