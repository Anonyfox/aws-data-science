import AWS from '../../aws'
import { TransformObjectData } from './transform_object_data'

/*
 * samples:
 *
 * { logStreamName: '2018/02/18/[$LATEST]783a8378e00c472cb0582b1852dc2a07',
    timestamp: 1518955887445,
    message: 'START RequestId: d6f432f3-14a4-11e8-ab7b-31f98ed45900 Version: $LATEST\n',
    ingestionTime: 1518955887460,
    eventId: '33873848213718905385796545780202476101858647062808559616' },
  { logStreamName: '2018/02/18/[$LATEST]783a8378e00c472cb0582b1852dc2a07',
    timestamp: 1518955889888,
    message: '2018-02-18T12:11:29.884Z\td6f432f3-14a4-11e8-ab7b-31f98ed45900\terror! https://www.nnn.de/lokales/rostock/ein-historischer-schatz-id19108856.html TypeError: Cannot read property \'forEach\' of null\n    at splitWords (/var/task/node_modules/teaser/lib/jsteaser.js:85:8)\n    at score (/var/task/node_modules/teaser/lib/jsteaser.js:191:27)\n    at JsTeaser.summarize (/var/task/node_modules/teaser/lib/jsteaser.js:301:21)\n    at Body.calculateSummary (/var/task/node_modules/flay-js/dist/lib/dom/body/index.js:32:12)\n    at new Body (/var/task/node_modules/flay-js/dist/lib/dom/body/index.js:14:14)\n    at new Website (/var/task/node_modules/flay-js/dist/lib/dom/index.js:14:21)\n    at Object.website (/var/task/node_modules/flay-js/dist/lib/index.js:7:12)\n    at Object.<anonymous> (/var/task/importer/news/feeds.js:33:51)\n    at next (native)\n    at fulfilled (/var/task/importer/news/feeds.js:4:58)\n',
    ingestionTime: 1518955889900,
    eventId: '33873848268199625905806858117924220817048014755389571072' },
  { logStreamName: '2018/02/18/[$LATEST]783a8378e00c472cb0582b1852dc2a07',
    timestamp: 1518955894330,
    message: 'END RequestId: d6f432f3-14a4-11e8-ab7b-31f98ed45900\n',
    ingestionTime: 1518955894346,
    eventId: '33873848367259536077679886118000315094345886510840283136' },
  { logStreamName: '2018/02/18/[$LATEST]783a8378e00c472cb0582b1852dc2a07',
    timestamp: 1518955894330,
    message: 'REPORT RequestId: d6f432f3-14a4-11e8-ab7b-31f98ed45900\tDuration: 6884.58 ms\tBilled Duration: 6900 ms \tMemory Size: 1024 MB\tMax Memory Used: 146 MB\t\n',
    ingestionTime: 1518955894346,
    eventId: '33873848367259536077679886118000315094345886510840283137' },
 */

export type CWLEvent = AWS.CloudWatchLogs.FilteredLogEvent
export interface IEvent {
  endTime: number
  messages: string[]
  startTime: number
}

function bufferToLog(buffer: CWLEvent[]): IEvent {
  const startEvent = buffer.shift()
  const reportEvent = buffer.pop()
  const endEvent = buffer.pop()
  // tslint:disable-next-line:no-console
  console.log('BAM')
  return {
    endTime: endEvent.timestamp,
    messages: buffer.map(e => e.message),
    startTime: startEvent.timestamp,
  }
}

export class ParseLambdaLog extends TransformObjectData<CWLEvent, IEvent> {
  constructor() {
    super()
    this.handler = (data: CWLEvent) => {
      // tslint:disable-next-line:no-console
      console.log('DATA: ', data)
      if (!this.buffer.length && !data.message.startsWith('START')) {
        return null
      } else if (!data.message.startsWith('REPORT')) {
        this.buffer.push(data)
        return null
      } else {
        this.buffer.push(data)
        const result = bufferToLog(this.buffer)
        this.buffer = []
        return result
      }
    }
  }
}
