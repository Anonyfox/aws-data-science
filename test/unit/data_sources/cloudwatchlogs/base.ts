// import { Collect, Origin } from '@lib'
// import 'chai/register-should'
// import { skip, slow, suite, test, timeout } from 'mocha-typescript'
// // import mock from '../../../mocks/cloudwatchlogs'

// @suite.skip('CloudWatchLogs::Base')
// class UnitTest {
//   static before() {
//     // mock()
//   }
//   @test
//   'can be instantiated'() {
//     const cwl = new Origin.CloudWatchLog('/aws/lambda/whatever')
//     cwl.should.to.be.an('object')
//   }

//   @test
//   @timeout(10000)
//   'can read data objects from stream'(done) {
//     const name = '/aws/lambda/whatever'
//     const yesterday = new Date().getTime() - 24 * 60 * 60 * 1000
//     const now = new Date().getTime()
//     const cwl = new Origin.CloudWatchLog(name, yesterday, now)
//     cwl.on('data', (data: any) => {
//       data.should.be.an('object')
//       data.message.should.be.a('string')
//     })
//     cwl.on('end', done)
//   }

//   @test
//   @timeout(10000)
//   async 'can await log collection'() {
//     const name = '/aws/lambda/whatever'
//     const yesterday = new Date().getTime() - 24 * 60 * 60 * 1000
//     const now = new Date().getTime()
//     const data = await new Origin.CloudWatchLog(name, yesterday, now)
//       .pipe(new Collect.Array<any>())
//       .promise()
//     data.should.be.an('array')
//     data.should.have.length(1)
//   }
// }
