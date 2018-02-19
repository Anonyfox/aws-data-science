import { Collect, Origin, Transform } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'

@suite('Transform::Filter')
class UnitTest {
  @test
  async 'can passthrough (filter nothing)'() {
    const data = [{ a: 1 }, { a: 2 }, { a: 3 }]
    const transformer = obj => true
    const result = await new Origin.Array(data)
      .pipe(new Transform.Filter(transformer))
      .pipe(new Collect.Array())
      .promise()
    result.should.be.an('array')
    result.should.have.length(3)
    result[0].should.be.deep.equal({ a: 1 })
  }

  @test
  async 'can block (filter all)'() {
    const data = [{ a: 1 }, { a: 2 }, { a: 3 }]
    const transformer = obj => false
    const result = await new Origin.Array(data)
      .pipe(new Transform.Filter(transformer))
      .pipe(new Collect.Array())
      .promise()
    result.should.be.an('array')
    result.should.have.length(0)
  }

  @test
  async 'can filter by simple expression'() {
    const data = [{ a: 1 }, { a: 2 }, { a: 3 }]
    const transformer = obj => obj.a % 2 === 0
    const result = await new Origin.Array(data)
      .pipe(new Transform.Filter(transformer))
      .pipe(new Collect.Array())
      .promise()
    result.should.be.an('array')
    result.should.have.length(1)
    result[0].should.be.deep.equal({ a: 2 })
  }
}
