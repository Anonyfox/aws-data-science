import { PassThrough } from 'stream'

export type handlerFn<T> = (data: T) => boolean

/**
 * expects a handler function with a truth test. count if result is true
 */
export class Count<T> extends PassThrough {
  protected accumulator: number = 0
  protected handler: handlerFn<T>

  constructor(handler: handlerFn<T>) {
    super({ objectMode: true })
    this.handler = handler
    this.on('data', (data: T) => {
      if (this.handler(data)) {
        this.accumulator++
      }
    })
  }

  result() {
    return this.accumulator
  }
}
