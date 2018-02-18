import * as AWSMock from 'aws-sdk-mock'
import lambdaSample from '../fixtures/cloudwatch_lambda_log'
/**
 * Mock cloudwatch's "filterLogEvents"
 */
export function mock(resp = { events: [{ message: 'mocked' }] }) {
  const cb = (params, callback) => callback(null, lambdaSample(3))
  AWSMock.mock('AWS.CloudWatchLogs', 'filterLogEvents', cb)
}

export function restore() {
  AWSMock.mock('AWS.CloudWatchLogs', 'filterLogEvents')
}
