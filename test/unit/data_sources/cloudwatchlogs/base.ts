import { CloudWatchLogs } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'

@suite('CloudWatchLogs')
class UnitTest {
  @test
  'can be instantiated'() {
    const cwl = new CloudWatchLogs('/aws/lambda/whatever')
    cwl.should.to.be.an('object')
  }

  @test
  'can switch regions'() {
    const cEU = new CloudWatchLogs('/aws/lambda/whatever')
    cEU.region.should.be.equal('eu-central-1')
    const cUS = new CloudWatchLogs('/aws/lambda/whatever', 'us-east-1')
    cUS.region.should.be.equal('us-east-1')
    cUS.region = 'eu-central-1'
    cUS.region.should.be.equal('eu-central-1')
  }

  @test
  'can fetch latest entries'() {
    const cwl = new CloudWatchLogs('/aws/lambda/whatever')
    cwl.should.to.be.an('object')
  }
}
