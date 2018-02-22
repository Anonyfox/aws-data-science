import { fromPairs, sortBy, toPairs } from 'lodash'
import { PassThrough } from 'stream'

export type handlerFn<T> = (data: T) => string | number

/**
 * expects a handler function which returns the variable to store,
 * return a falsy value to skip the current value
 */
export class List<T> extends PassThrough {
  protected accumulator: Array<any> = []
  protected handler: handlerFn<T>

  constructor(handler: handlerFn<T>) {
    super({ objectMode: true })
    this.handler = handler
    this.on('data', (data: T) => {
      const result = this.handler(data)
      if (result) {
        this.accumulator.push(result)
      }
    })
  }

  result() {
    return this.accumulator
  }
}
