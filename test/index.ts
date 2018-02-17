import { expect } from 'chai'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'

@suite
class Stuff {
  @test
  'demo stuff'() {
    expect('a').to.be.equal('a')
  }
}
