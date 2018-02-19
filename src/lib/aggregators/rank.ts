import { fromPairs, sortBy, toPairs } from 'lodash'
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

  resultObject(ascending: boolean = false): object {
    return fromPairs(this.result(ascending))
  }

  resultArray(ascending: boolean = false): object[] {
    const list = this.result(ascending)
    return list.map(([k, v]) => ({ [k]: v })).reverse()
  }

  private result(ascending: boolean = false): Array<[string, number]> {
    const pairs = toPairs(this.accumulator) as Array<[string, number]>
    const sorted = sortBy(pairs, p => p[1])
    return ascending ? sorted.reverse() : sorted
  }
}
