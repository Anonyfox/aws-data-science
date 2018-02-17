import { Readable } from 'stream'
import AWS from '../../../aws'
import CloudWatchLogEvent from './event'

export type CWLResp = AWS.CloudWatchLogs.Types.FilterLogEventsResponse
export type CWLParams = AWS.CloudWatchLogs.Types.FilterLogEventsRequest

export class CloudWatchLogs extends Readable {
  logGroupName: string
  startTime: number
  endTime: number
  private client: AWS.CloudWatchLogs = new AWS.CloudWatchLogs()
  private nextToken: string = undefined
  private buffer: any[] = []
  private hasStarted = false

  constructor(logGroupName: string, startTime?: number, endTime?: number) {
    super({ objectMode: true })
    this.logGroupName = logGroupName
    this.startTime = startTime || undefined
    this.endTime = endTime || undefined
  }

  async _read(): Promise<void> {
    // there is an item in buffer
    if (this.buffer.length) {
      this.push(this.buffer.shift())
      // fetch the first result page or the next one
    } else if (!this.hasStarted || this.nextToken) {
      this.hasStarted = true
      const entries = await this.fetchPage()
      this.buffer = entries.events
      this.nextToken = entries.nextToken
      this._read()
      // nothing left to do
    } else {
      this.push(null)
    }
  }

  // stream(startTime, endTime): Readable {
  //   new Readable()
  // }

  // async latestEntries(amount?: number): Promise<CloudWatchLogEvent[]> {
  //   const params: AWS.CloudWatchLogs.Types.FilterLogEventsRequest = {
  //     endTime: new Date().getTime(),
  //     limit: amount || 1000,
  //     logGroupName: this.logGroupName,
  //   }
  //   const list = await this.client.filterLogEvents(params).promise()
  //   return list.events.map(e => new CloudWatchLogEvent('', e.message))
  // }

  private async fetchPage(): Promise<CWLResp> {
    const logGroupName = this.logGroupName
    const params: CWLParams = { logGroupName }
    params.startTime = this.startTime
    params.endTime = this.endTime
    params.nextToken = this.nextToken
    return this.client.filterLogEvents(params).promise()
  }
}
