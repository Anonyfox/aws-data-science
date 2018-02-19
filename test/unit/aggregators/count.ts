import { Aggregate, Collect, Origin } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'

@suite('Aggregate::Count')
class UnitTest {
  @test
  async 'can count events in stream'() {
    const countAll = new Aggregate.Count<number>(data => !!data)
    const countEven = new Aggregate.Count<number>(data => data % 2 === 0)
    const result = await new Origin.Array([1, 2, 3, 4, 5, 6])
      .pipe(countAll)
      .pipe(countEven)
      .pipe(new Collect.Array<number>())
      .promise()
    result.should.be.an('array')
    result.should.have.length(6)
    countAll.result().should.be.equal(6)
    countEven.result().should.be.equal(3)
  }
}
