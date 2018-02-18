import { Collect, Origin } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { Readable } from 'stream'

@suite('Origin::Array')
class UnitTest {
  @test
  async 'can emit array elements'() {
    const result = await new Origin.Array([1, 2, 3])
      .pipe(new Collect.Array<number>())
      .promise()
    result.should.be.an('array')
    result.should.have.length(3)
  }
}
