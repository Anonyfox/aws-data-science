import * as AWS from 'aws-sdk-mock'
import * as mockFS from 'mock-fs'
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

const mockFolder = path => mockFS({ [path]: {} })
const restoreFolder = () => mockFS.restore()

export default class UnitTest {
  static mockAwsCloudWatchLogs = mockAwsCloudWatchLogs
  static restoreAwsCloudWatchLogs = restoreAwsCloudWatchLogs
  static mockFolder = mockFolder
  static restoreFolder = restoreFolder

  mockAwsCloudWatchLogs = mockAwsCloudWatchLogs
  restoreAwsCloudWatchLogs = restoreAwsCloudWatchLogs
  mockFolder = mockFolder
  restoreFolder = restoreFolder
}
