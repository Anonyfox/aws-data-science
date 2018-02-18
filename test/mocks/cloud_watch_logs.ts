import * as AWSMock from 'aws-sdk-mock'

/**
 * Mock cloudwatch's "filterLogEvents"
 */
export function mock(resp = { events: [{ message: 'mocked' }] }) {
  const cb = (params, callback) => callback(null, resp)
  AWSMock.mock('CloudWatchLogs', 'filterLogEvents', cb)
}

export function restore() {
  AWSMock.mock('CloudWatchLogs', 'filterLogEvents')
}
