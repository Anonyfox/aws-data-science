import { Aggregate, Collect, Origin } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'

@suite('Aggregate::Mean')
class UnitTest {
  @test
  async 'can count numbers in stream and hold mean value'() {
    const mean = new Aggregate.Mean<number>(num => num)
    const result = await new Origin.Array([1, 2, 3, 4, 5])
      .pipe(mean)
      .pipe(new Collect.Nothing())
      .promise()
    mean.result().should.be.equal(3)
  }
}
