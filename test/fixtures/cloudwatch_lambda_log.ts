import * as uuid from 'uuid/v1'

export default function genLambdaLog(amount: number = 1) {
  const events = []
  for (let i = 0; i < amount; i++) {
    const id = uuid()
    events.push({
      message: `START\tRequestId: ${id}\tVersion: $LATEST\n`,
      timestamp: new Date().getTime(),
    })
    events.push({
      message: `${new Date()}\t${id}\t${'lambda message'}\n`,
      timestamp: new Date().getTime(),
    })
    events.push({
      message: `END\tRequestId: ${id}\n`,
      timestamp: new Date().getTime(),
    })
    events.push({
      message: `REPORT RequestId: ${id}\tDuration: 1234.56 ms\tBilled Duration: 1200 ms \tMemory Size: 1024 MB\tMax Memory Used: 123 MB\t\n`,
      timestamp: new Date().getTime(),
    })
  }
  return { events }
}
