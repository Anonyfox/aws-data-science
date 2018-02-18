import { Transform } from 'stream'
import AWS from '../../../aws'

export type LogEvent = AWS.CloudWatchLogs.FilteredLogEvent

export class TransformLambdaLogs extends Transform {
  private buffer: LogEvent[] = []

  constructor() {
    super({ objectMode: true })
  }

  _transform(data: LogEvent, encoding, callback): void {
    // skip if not beginning
    if (!this.buffer.length && !data.message.startsWith('START')) {
      callback()
      // some log event between START and REPORT
    } else if (!data.message.startsWith('REPORT')) {
      this.buffer.push(data)
      callback()

      // data completed, this is a REPORT event
    } else {
      this.buffer.push(data)
      // do stuff with buffer, there are all events needed for transform now
      this.buffer = []
      callback(null, { message: `event` }) // push new thing instead of {}
    }
  }
}
