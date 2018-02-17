# import * as moment from "moment"
# import { range } from '../misc/datetimes'
import { Readable } from 'stream'
import { flatten, groupBy, map, sortBy } from 'lodash'

export default class CloudWatch

  constructor: (@logGroupName, @region = "eu-central-1") ->
    AWS = require "aws-sdk"
    AWS.config.update region: @region
    @logs = new AWS.CloudWatchLogs()

  fetchPage: (startTime, endTime, nextToken = undefined) ->
    params = { @logGroupName, startTime, endTime, nextToken, interleaved: true }
    @logs.filterLogEvents(params).promise()

  sync: (startTime, endTime) ->
    hasMoreEntries = true
    results = []
    nextToken = undefined
    while hasMoreEntries
      entries = await @fetchPage startTime, endTime, nextToken
      nextToken = entries.nextToken || false
      hasMoreEntries = nextToken
      results.push entries.events
    lines = (parseLambdaLogEvent event for event in flatten results)
    eventGroups = sortBy groupBy(lines, "requestId"), 'timestamp'
    events = map eventGroups, (g) -> g.filter


  stream: (startTime, endTime) ->
    hasMoreEntries = true
    nextToken = undefined
    while hasMoreEntries
      entries = await @fetchPage startTime, endTime, nextToken
      nextToken = entries.nextToken || false
      hasMoreEntries = nextToken
      results.push entries.events
    flatten results

parseLambdaLogEvent = (event) ->
  switch
    when /^START RequestId: /.test event.message
      [_all, requestId ] = event.message.match /^START RequestId: (.+) Version/
      { timestamp: event.timestamp, requestId, type: "start" }
    when /^END RequestId: /.test event.message
      [_all, requestId ] = event.message.match /^END RequestId: (.+)\n/
      { timestamp: event.timestamp, requestId, type: "end" }
    when /^REPORT RequestId: /.test event.message
      [_all, requestId, duration, billedDuration, memSize, memUsed ] = event.message.match /^REPORT RequestId: (.+)\tDuration: (.+) ms\tBilled Duration: (.*) ms \tMemory Size: (.*) MB\tMax Memory Used: (.*) MB/
      { timestamp: event.timestamp, requestId, duration, billedDuration, memSize, memUsed }
    else
      [_all, _time, requestId, body] = event.message.match /^(.+)\t(.+)\t([\s\S]*)/
      { timestamp: event.timestamp, requestId, body, type: "payload" }
