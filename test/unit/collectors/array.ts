import { Collect, Origin } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'

@suite('Collect::Array')
class UnitTest {
  @test
  async 'can collect simple numbers array'() {
    const result = await new Origin.Array([1, 2, 3])
      .pipe(new Collect.Array<number>())
      .promise()
    result.should.be.an('array')
    result.should.have.length(3)
  }

  @test
  async 'can collect object array'() {
    interface IObject {
      a: number
    }
    const data: IObject[] = [{ a: 1 }, { a: 2 }, { a: 3 }]
    const result = await new Origin.Array(data)
      .pipe(new Collect.Array<IObject>())
      .promise()
    result.should.be.an('array')
    result.should.have.length(3)
    result[0].should.be.deep.equal({ a: 1 })
  }
}
