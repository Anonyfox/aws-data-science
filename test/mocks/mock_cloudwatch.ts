import { AWSError, CloudWatchLogs, Request } from 'aws-sdk'
import * as AWS from 'aws-sdk-mock'

// types for cloudwatch filterLogEvents
export type filterParams = CloudWatchLogs.Types.FilterLogEventsRequest
export type filterResponse = CloudWatchLogs.Types.FilterLogEventsResponse
export type filterCallback = (err: AWSError, data: filterResponse) => void
export type filterReturn = Request<filterResponse, AWSError>

/**
 * Mock cloudwatch's "filterLogEvents"
 */
export default () => {
  const cb = (params: filterParams, callback: filterCallback): void => {
    const error: AWSError = null
    const data: filterResponse = { events: [] }
    callback(error, data)
  }
  AWS.mock('CloudWatchLogs', 'filterLogEvents', cb)
}
