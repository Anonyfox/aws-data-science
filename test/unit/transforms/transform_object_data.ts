import { Collect, Origin, Transform } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { Readable } from 'stream'

@suite('Transform::Objects')
class UnitTest {
  @test
  async 'can modify objects in stream'() {
    interface IObject {
      a: number
    }
    interface IResult {
      b: number
    }
    const data: IObject[] = [{ a: 1 }, { a: 2 }, { a: 3 }]
    const transformer = (obj: IObject): IResult => ({ b: obj.a + 1 })
    const result = await new Origin.Array(data)
      .pipe(new Transform.TransformObjectData(transformer))
      .pipe(new Collect.Array<IResult>())
      .promise()
    result.should.be.an('array')
    result.should.have.length(3)
    result[0].should.be.deep.equal({ b: 2 })
  }
}
