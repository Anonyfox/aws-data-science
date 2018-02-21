import { Collect, Origin } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'

@suite('Collect::Nothing')
class UnitTest {
  @test
  async 'can collect stuff like /dev/null'() {
    const result = await new Origin.Array([1, 2, 3])
      .pipe(new Collect.Nothing())
      .promise()
  }
}
