import { Collect, Origin } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import UnitTest from '../unit_test'

@suite('Collect::JSON-File')
class UnitTestCollectJsonFile extends UnitTest {
  before() {
    this.mockFolder('./tmp')
  }

  after() {
    this.restoreFolder()
  }

  @test
  async 'can collect objects into file'() {
    interface IObject {
      a: number
    }
    const data: IObject[] = [{ a: 1 }, { a: 2 }, { a: 3 }]
    const result = await new Origin.Array(data)
      .pipe(new Collect.JsonFile<IObject>('./tmp/demo.json'))
      .promise()
    result.should.be.an('object')
    result.should.have.keys('lines', 'bytes')
    result.lines.should.be.equal(3)
    const file = require('fs').readFileSync('./tmp/demo.json', 'utf-8')
    const writtenJson = JSON.parse(file)
    writtenJson.should.be.an('array')
    writtenJson.should.have.length(result.lines)
  }
}
