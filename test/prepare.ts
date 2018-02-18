import * as prepare from 'mocha-prepare'
import * as CWL from './mocks/cloud_watch_logs'

prepare(
  done => {
    CWL.mock()
    done()
  },
  done => {
    // called after all test completes (regardless of errors)
    done()
  }
)
