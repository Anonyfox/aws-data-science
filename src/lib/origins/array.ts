import { Readable, Writable } from 'stream'

export class Array<T> extends Readable {
  constructor(private buffer: T[]) {
    super({ objectMode: true })
  }

  _read(): void {
    this.buffer.length ? this.push(this.buffer.shift()) : this.push(null)
  }
}
