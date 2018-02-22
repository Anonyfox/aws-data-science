import { createWriteStream, WriteStream } from 'fs'
import { Writable } from 'stream'
import { ICollector } from './interface'

export interface IFileStats {
  bytes: number
  lines: number
}

export class JsonFile<T> extends Writable implements ICollector {
  private fileStream: WriteStream
  private firstLineWritten: boolean = false
  private writtenLines: number = 0
  private writtenBytes: number = 2 // enclosing brackets!

  constructor(filePath, private pretty: boolean = false) {
    super({ objectMode: true })
    this.fileStream = createWriteStream(filePath)
    this.fileStream.write('[')
    this.on('finish', () => this.fileStream.write(']'))
  }

  _write(chunk: T, encoding, callback): void {
    const json = this.pretty
      ? JSON.stringify(chunk, null, 2)
      : JSON.stringify(chunk)
    const prefix = this.firstLineWritten ? ',\n' : ''
    const str = prefix + json
    this.fileStream.write(str)
    this.firstLineWritten = true
    this.writtenLines++
    this.writtenBytes += Buffer.byteLength(str, 'utf-8')
    callback()
  }

  promise(): Promise<IFileStats> {
    return new Promise((resolve, reject) => {
      this.on('error', error => reject(error))
      this.on('finish', () => {
        const result = { lines: this.writtenLines, bytes: this.writtenBytes }
        resolve(result)
      })
    })
  }
}
