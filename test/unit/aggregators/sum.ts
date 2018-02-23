import { Aggregate, Collect, Origin } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'

@suite('Aggregate::Sum')
class UnitTest {
  @test
  async 'can count numbers in stream and hold sum'() {
    const sum = new Aggregate.Sum<number>(num => num)
    const result = await new Origin.Array([1, 2, 3, 4, 5])
      .pipe(sum)
      .pipe(new Collect.Nothing())
      .promise()
    sum.result().should.be.equal(15)
  }
}
