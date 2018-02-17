import { range } from "./lib/misc/datetimes"
import CloudWatch from "./lib/data_sources/cloudwatch"

{ startTime, endTime } = range new Date().getTime(), "day"
cw = new CloudWatch "/aws/lambda/rostock-rocks-dev-importNews"
result = cw.sync startTime, endTime
result.then (data) -> console.log data
console.log result
