// import { Collect, Origin } from '@lib'
// import 'chai/register-should'
// import { skip, slow, suite, test, timeout } from 'mocha-typescript'
// // import mock from '../../../mocks/cloudwatchlogs'

// @suite.skip('CloudWatchLogs::transform_lambda_logs')
// class UnitTest {
//   static before() {
//     // mock()
//   }

//   @test
//   @timeout(10000)
//   async 'can read data objects from stream'() {
//     const name = '/aws/lambda/rostock-rocks-dev-importNews'
//     const yesterday = new Date().getTime() - 24 * 60 * 60 * 1000
//     const now = new Date().getTime()
//     const lambdaLogs = await new Origin.CloudWatchLog(name, yesterday, now)
//       // .pipe(new TransformLambdaLogs())
//       .pipe(new Collect.Array<any>())
//       .promise()
//     lambdaLogs.should.be.an('array')
//     // tslint:disable-next-line:no-console
//     console.log(lambdaLogs)
//   }
// }
