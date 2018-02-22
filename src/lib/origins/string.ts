import { Readable, Writable } from 'stream'

export class String extends Readable {
  private buffer: string[] = []

  constructor(corpus: string, private splitter: RegExp = /[\?!,.;]*\s+/) {
    super({ objectMode: true })
    this.buffer = corpus.split(splitter)
  }

  _read(): void {
    this.buffer.length ? this.push(this.buffer.shift()) : this.push(null)
  }
}
