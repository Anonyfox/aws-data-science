export default class Counter

  constructor: ->
    @data = {}

  add: (thing) ->
    if @data[thing] then @data[thing]++ else @data[thing] = 1
