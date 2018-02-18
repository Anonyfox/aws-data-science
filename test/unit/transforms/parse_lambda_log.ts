import { Collect, Origin, Transform } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { Readable } from 'stream'
import UnitTest from '../unit_test'

@suite('Transform::LambdaLog')
class UnitTestParseLambdaLog extends UnitTest {
  before() {
    this.mockAwsCloudWatchLogs('lambda')
  }

  after() {
    this.restoreAwsCloudWatchLogs()
  }

  @test
  async 'can aggregate lambda events from cloudwatch log streams'() {
    const name = '/aws/lambda/whatever'
    const yesterday = new Date().getTime() - 24 * 60 * 60 * 1000
    const now = new Date().getTime()
    const data = await new Origin.CloudWatchLog(name, yesterday, now)
      .pipe(new Transform.ParseLambdaLog())
      .pipe(new Collect.Array<any>())
      .promise()
    data.should.be.an('array')
    data.should.have.length(3)
    data[0].should.have.keys('endTime', 'messages', 'performance', 'startTime')
    data[0].messages.should.be.an('array')
    data[0].messages.should.have.length(1)
  }
}
