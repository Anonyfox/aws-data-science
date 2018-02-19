import { PassThrough } from 'stream'

export type handlerFn<T> = (data: T) => string | number

/**
 * expects a handler function which returns the variable to count,
 * must be a string or number and results in a dict with
 * `dict[variable]` = occurences
 */
export class Rank<T> extends PassThrough {
  protected accumulator: object = {}
  protected handler: handlerFn<T>

  constructor(handler: handlerFn<T>) {
    super({ objectMode: true })
    this.handler = handler
    this.on('data', (data: T) => {
      const acc = this.accumulator
      const key = this.handler(data)
      acc[key] ? acc[key]++ : (acc[key] = 1)
    })
  }

  result() {
    return this.accumulator
  }
}
