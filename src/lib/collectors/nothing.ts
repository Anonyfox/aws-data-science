import { Writable } from 'stream'

export class Nothing extends Writable {
  constructor() {
    super({ objectMode: true })
  }

  _write(chunk, encoding, callback): void {
    callback()
  }

  promise(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.on('error', error => reject(error))
      this.on('finish', () => resolve())
    })
  }
}
