import "chai/register-should"
import { keys } from "lodash"
import * as transforms from '../../lib/misc/transforms'

describe 'Misc', ->
  describe 'Transforms', ->

    it 'can transform object to sorted array ascending', ->
      src = { a: 2, b: 1 }
      ary = transforms.ascendingArray src
      ary.should.have.length 2
      ary[0].should.have.same.members ["b", 1]
      ary[1].should.have.same.members ["a", 2]

    it 'can transform object to sorted array descending', ->
      src = { a: 1, b: 2 }
      ary = transforms.descendingArray src
      ary.should.have.length 2
      ary[0].should.have.same.members ["b", 2]
      ary[1].should.have.same.members ["a", 1]

    it 'can transform object to sorted object ascending', ->
      src = { a: 2, b: 1 }
      obj = transforms.ascendingObject src
      keys(obj).should.deep.equal keys { b: 1, a: 2 }

    it 'can transform object to sorted object descending', ->
      src = { a: 1, b: 2 }
      obj = transforms.descendingObject src
      keys(obj).should.deep.equal keys { b: 2, a: 1 }