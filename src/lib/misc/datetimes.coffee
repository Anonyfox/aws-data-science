import moment from "moment"

export range = (time, unit) ->
  ts = moment(time)
  t1 = parseInt ts.startOf(unit).format('x')
  t2 = parseInt ts.endOf(unit).format('x')
  { startTime: t1, endTime: t2 }
