import { CloudWatchLogs } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'

@suite
class TestCloudWatchLogs {
  @test
  'can be instantiated'() {
    const cwl = new CloudWatchLogs()
    cwl.should.to.be.an('object')
  }
}
