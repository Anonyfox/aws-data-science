import { Collect, Origin, Transform } from '@lib'
import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import { Readable } from 'stream'

@suite.skip('Transform::LambdaLog')
class UnitTestParseLambdaLog {
  @test
  async 'can aggregate lambda events from cloudwatch log streams'() {
    const name = '/aws/lambda/whatever'
    const yesterday = new Date().getTime() - 24 * 60 * 60 * 1000
    const now = new Date().getTime()
    const data = await new Origin.CloudWatchLog(name, yesterday, now)
      .pipe(new Transform.ParseLambdaLog())
      .pipe(new Collect.Array<any>())
      .promise()
    data.should.be.an('array')
    data.should.have.length(3)
    // tslint:disable-next-line:no-console
    console.log(data)
    data[0].should.be.deep.equal({ b: 2 })
  }
}
