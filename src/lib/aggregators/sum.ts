import { PassThrough } from 'stream'

export type handlerFn<T> = (data: T) => number

/**
 * expects a handler function with a truth test. count if result is true
 */
export class Sum<T> extends PassThrough {
  protected accumulator: number = 0
  protected handler: handlerFn<T>

  constructor(handler: handlerFn<T>) {
    super({ objectMode: true })
    this.handler = handler
    this.on('data', (data: T) => (this.accumulator += this.handler(data)))
  }

  result() {
    return this.accumulator
  }
}
