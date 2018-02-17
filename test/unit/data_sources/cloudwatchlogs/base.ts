import { CloudWatchLogs } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import mock from '../../../mocks/cloudwatchlogs'

@suite('CloudWatchLogs')
class UnitTest {
  static before() {
    mock()
  }
  @test
  'can be instantiated'() {
    const cwl = new CloudWatchLogs('/aws/lambda/whatever')
    cwl.should.to.be.an('object')
  }

  @test
  @timeout(10000)
  'can read data objects from stream'(done) {
    const name = '/aws/lambda/whatever'
    const yesterday = new Date().getTime() - 24 * 60 * 60 * 1000
    const now = new Date().getTime()
    const cwl = new CloudWatchLogs(name, yesterday, now)
    cwl.on('data', (data: any) => {
      data.should.be.an('object')
      data.message.should.be.a('string')
    })
    cwl.on('end', done)
  }
}
