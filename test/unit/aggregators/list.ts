import { Aggregate, Collect, Origin } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'

@suite('Aggregate::List')
class UnitTest {
  @test
  async 'can count store all values'() {
    const list = new Aggregate.List<number>(data => data)
    const result = await new Origin.Array([1, 2, 3])
      .pipe(list)
      .pipe(new Collect.Nothing())
      .promise()
    list.result().should.be.an('array')
    list.result().should.have.length(3)
  }

  @test
  async 'can count store some values'() {
    const list = new Aggregate.List<number>(data => (data % 2 ? data : null))
    const result = await new Origin.Array([1, 2, 3])
      .pipe(list)
      .pipe(new Collect.Nothing())
      .promise()
    list.result().should.be.an('array')
    list.result().should.have.length(2)
    list.result().should.deep.equal([1, 3])
  }
}
