import { Writable } from 'stream'

export interface ICollector extends Writable {
  promise(): Promise<any>
}
