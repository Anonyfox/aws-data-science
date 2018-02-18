import { PassThrough } from 'stream'

export type handlerFn<T> = (data: T) => number

export class Count<T> extends PassThrough {
  accumulator: number = 0
  handler: handlerFn<T>

  constructor(handler: handlerFn<T>) {
    super({ objectMode: true })
    this.handler = handler
    this.on('data', (data: T) => (this.accumulator += handler(data)))
  }

  result() {
    return this.accumulator
  }
}
