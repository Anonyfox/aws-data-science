import { Aggregate, Collect, Origin } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'

@suite('Aggregate::Count')
class UnitTest {
  @test
  async 'can count events in stream'() {
    const countNumbers = new Aggregate.Count<number>(data => data)
    const countElements = new Aggregate.Count<number>(data => 1)
    const result = await new Origin.Array([1, 2, 3])
      .pipe(countNumbers)
      .pipe(countElements)
      .pipe(new Collect.Array<number>())
      .promise()
    result.should.be.an('array')
    result.should.have.length(3)
    countElements.accumulator.should.be.equal(3)
    countNumbers.accumulator.should.be.equal(6)
  }
}
