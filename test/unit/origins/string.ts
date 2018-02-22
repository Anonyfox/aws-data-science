import { Collect, Origin } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { Readable } from 'stream'

@suite('Origin::String')
class UnitTest {
  @test
  async 'can emit string elements'() {
    const result = await new Origin.String('hello world')
      .pipe(new Collect.Array<string>())
      .promise()
    result.should.be.an('array')
    result.should.have.length(2)
  }
}
