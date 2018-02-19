import { Aggregate, Collect, Origin } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'

@suite('Aggregate::Rank')
class UnitTest {
  @test
  async 'can count string occurences in stream'() {
    const rank = new Aggregate.Rank<string>(data => data)
    const result = await new Origin.Array(['a', 'b', 'a'])
      .pipe(rank)
      .pipe(new Collect.Array<number>())
      .promise()
    result.should.be.an('array')
    result.should.have.length(3)
    rank.resultObject().should.deep.equal({ a: 2, b: 1 })
    rank.resultArray().should.deep.equal([{ a: 2 }, { b: 1 }])
  }

  @test
  async 'can count number occurences in stream'() {
    const rank = new Aggregate.Rank<string>(data => data)
    const result = await new Origin.Array([1, 1, 2])
      .pipe(rank)
      .pipe(new Collect.Array<number>())
      .promise()
    result.should.be.an('array')
    result.should.have.length(3)
    rank.resultObject().should.deep.equal({ 1: 2, 2: 1 })
    rank.resultArray().should.deep.equal([{ 1: 2 }, { 2: 1 }])
  }
}
