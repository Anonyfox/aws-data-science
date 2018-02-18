import { Collect, Origin } from '@lib'
import * as AWS from 'aws-sdk'
import * as AWSMock from 'aws-sdk-mock'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import sample from '../../fixtures/cloudwatch_lambda_log'

// const cb = (params, callback) => callback(null, sample(3))
// AWSMock.mock('AWS.CloudWatchLogs', 'filterLogEvents', cb)

@suite('Origin:CloudWatchLog')
class UnitTest {
  // before() {
  //   const cb = (params, callback) => callback(null, sample(3))
  //   AWSMock.mock('AWS.CloudWatchLogs', 'filterLogEvents', cb)
  // }

  // after() {
  //   AWSMock.mock('AWS.CloudWatchLogs', 'filterLogEvents')
  // }

  @test
  'can be instantiated'() {
    const cwl = new Origin.CloudWatchLog('/aws/lambda/whatever')
    cwl.should.to.be.an('object')
  }

  @test
  'can read data objects from stream'(done) {
    const cb = (params, callback) => callback(null, sample(3))
    AWSMock.mock('AWS.CloudWatchLogs', 'filterLogEvents', cb)
    const name = '/aws/lambda/whatever'
    const yesterday = new Date().getTime() - 24 * 60 * 60 * 1000
    const now = new Date().getTime()
    const cwl = new Origin.CloudWatchLog(name, yesterday, now)
    cwl.on('data', (data: any) => {
      data.should.be.an('object')
      data.message.should.be.a('string')
    })
    cwl.on('end', done)
  }

  @test
  async 'can await log collection'() {
    const name = '/aws/lambda/whatever'
    const yesterday = new Date().getTime() - 24 * 60 * 60 * 1000
    const now = new Date().getTime()
    const data = await new Origin.CloudWatchLog(name, yesterday, now)
      .pipe(new Collect.Array<any>())
      .promise()
    data.should.be.an('array')
    data.should.have.length(1)
  }
}
