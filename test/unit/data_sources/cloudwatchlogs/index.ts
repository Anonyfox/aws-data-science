import { CloudWatchLogs } from '@lib'
import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'

@suite
class TestCloudWatchLogs {
  @test
  'can be instantiated'() {
    const cwl = new CloudWatchLogs()
    expect(cwl).to.be.an('object')
  }
}
