import { Collect, Origin, Transform } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { Readable } from 'stream'

@suite('Transform::Map')
class UnitTest {
  @test
  async 'can map objects in stream to other objects'() {
    const data = [{ a: 1 }, { a: 2 }, { a: 3 }]
    const mapper = obj => ({ b: obj.a + 1 })
    const result = await new Origin.Array(data)
      .pipe(new Transform.Map(mapper))
      .pipe(new Collect.Array())
      .promise()
    result.should.be.an('array')
    result.should.have.length(3)
    result[0].should.be.deep.equal({ b: 2 })
  }

  @test
  async 'can map objects in stream to strings'() {
    const data = [{ a: 1 }, { a: 2 }, { a: 3 }]
    const mapper = obj => JSON.stringify(obj)
    const result = await new Origin.Array(data)
      .pipe(new Transform.Map(mapper))
      .pipe(new Collect.Array())
      .promise()
    result.should.be.an('array')
    result.should.have.length(3)
    result[0].should.be.deep.equal('{"a":1}')
  }

  @test
  async 'can map objects in stream to static number'() {
    const data = [{ a: 1 }, { a: 2 }, { a: 3 }]
    const mapper = obj => 1
    const result = await new Origin.Array(data)
      .pipe(new Transform.Map(mapper))
      .pipe(new Collect.Array())
      .promise()
    result.should.be.an('array')
    result.should.have.length(3)
    result[0].should.be.equal(1)
  }

  @test
  async 'can map objects in stream to empty string'() {
    const data = [{ a: 1 }, { a: 2 }, { a: 3 }]
    const mapper = obj => ''
    const result = await new Origin.Array(data)
      .pipe(new Transform.Map(mapper))
      .pipe(new Collect.Array())
      .promise()
    result.should.be.an('array')
    result.should.have.length(3)
    result[0].should.be.equal('')
  }

  @test
  async 'can map objects in stream to zero'() {
    const data = [{ a: 1 }, { a: 2 }, { a: 3 }]
    const map = obj => 0
    const result = await new Origin.Array(data)
      .pipe(new Transform.Map(map))
      .pipe(new Collect.Array())
      .promise()
    result.should.be.an('array')
    result.should.have.length(3)
    result[0].should.be.equal(0)
  }

  @test
  async 'can map objects in stream to false'() {
    const data = [{ a: 1 }, { a: 2 }, { a: 3 }]
    const mapper = obj => false
    const result = await new Origin.Array(data)
      .pipe(new Transform.Map(mapper))
      .pipe(new Collect.Array())
      .promise()
    result.should.be.an('array')
    result.should.have.length(3)
    result[0].should.be.equal(false)
  }
}
