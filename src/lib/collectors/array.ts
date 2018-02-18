import { Writable } from 'stream'

export class Array<T> extends Writable {
  private buffer: T[] = []

  constructor() {
    super({ objectMode: true })
  }

  _write(chunk: T, encoding, callback): void {
    this.buffer.push(chunk)
    callback()
  }

  promise(): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.on('error', error => reject(error))
      this.on('finish', () => resolve(this.buffer))
    })
  }
}
