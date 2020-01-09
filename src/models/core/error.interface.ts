export interface CommonErr extends Error {
  status: number
  data?: any
}
