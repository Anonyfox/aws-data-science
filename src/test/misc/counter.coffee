import "chai/register-should"
import Counter from '../../lib/misc/counter'

describe 'Misc', ->
  describe 'Counter', ->

    it 'can be instanced', ->
      c = new Counter
      c.should.be.an 'object'

    it 'can count things', ->
      c = new Counter
      c.data.should.not.have.key "thing"
      c.add "thing"
      c.data.should.have.key "thing"
      c.data["thing"].should.be.equal 1

    it 'can count things without duplication', ->
      c = new Counter
      c.data.should.not.have.key "thing"
      c.add "thing"
      c.add "thing"
      c.data.should.have.key "thing"
      c.data["thing"].should.be.equal 2