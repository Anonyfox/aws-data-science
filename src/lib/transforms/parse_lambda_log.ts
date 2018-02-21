import AWS from '../../aws'
import { TransformObjectData } from './transform_object_data'

export type CWLEvent = AWS.CloudWatchLogs.FilteredLogEvent
export interface IEvent {
  endTime: number
  messages: string[]
  performance: {
    billedDuration: number
    duration: number
    maxMemory: number
    memoryUsed: number
  }
  startTime: number
}

function parseReportLine(str) {
  const rx = /REPORT RequestId: .*\tDuration: (.+) ms\tBilled Duration: (.+) ms \tMemory Size: (.+) MB\tMax Memory Used: (.+) MB/
  const [, duration, billedDuration, maxMemory, memoryUsed] = str.match(rx)
  return {
    billedDuration: parseFloat(billedDuration),
    duration: parseFloat(duration),
    maxMemory: parseFloat(maxMemory),
    memoryUsed: parseFloat(memoryUsed),
  }
}

function bufferToLog(buffer: CWLEvent[]): IEvent {
  const startEvent = buffer.shift()
  const reportEvent = buffer.pop()
  const endEvent = buffer.pop()
  return {
    endTime: endEvent.timestamp,
    messages: buffer.map(e => e.message),
    performance: parseReportLine(reportEvent.message),
    startTime: startEvent.timestamp,
  }
}

export class ParseLambdaLog extends TransformObjectData<CWLEvent, IEvent> {
  constructor() {
    super()
    this.handler = (data: CWLEvent) => {
      if (!this.buffer.length && !data.message.startsWith('START')) {
        return
      } else if (!data.message.startsWith('REPORT')) {
        this.buffer.push(data)
        return
      } else {
        this.buffer.push(data)
        const result = bufferToLog(this.buffer)
        this.buffer = []
        return result
      }
    }
  }
}
