import { Transform } from 'stream'

export class TransformObjectData<T, S> extends Transform {
  protected buffer: T[] = []
  protected handler: (T) => S

  constructor(handler?: (T) => S) {
    super({ objectMode: true })
    const defaultHandler = (obj: T): S => undefined
    this.handler = handler || defaultHandler
  }

  async _transform(data: T, encoding, callback: (Error?, S?) => void) {
    try {
      const result = await this.handler(data)
      typeof result !== 'undefined' ? callback(null, result) : callback()
    } catch (error) {
      callback(error, null)
    }
  }
}
