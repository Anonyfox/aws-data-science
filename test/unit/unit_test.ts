import * as AWS from 'aws-sdk-mock'
import lambdaLogSample from '../fixtures/cloudwatch_lambda_log'
import * as CWL from '../mocks/cloud_watch_logs'

const mockAwsCloudWatchLogs = (mode: 'default' | 'lambda' = 'default') => {
  const resp =
    mode === 'default'
      ? { events: [{ message: 'mocked' }] }
      : lambdaLogSample(3)
  const cb = (params, callback) => callback(null, resp)
  AWS.mock('CloudWatchLogs', 'filterLogEvents', cb)
}

const restoreAwsCloudWatchLogs = () =>
  AWS.restore('CloudWatchLogs', 'filterLogEvents')

export default class UnitTest {
  static mockAwsCloudWatchLogs = mockAwsCloudWatchLogs
  static restoreAwsCloudWatchLogs = restoreAwsCloudWatchLogs

  mockAwsCloudWatchLogs = mockAwsCloudWatchLogs
  restoreAwsCloudWatchLogs = restoreAwsCloudWatchLogs
}
