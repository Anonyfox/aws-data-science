# AWS Data Science

Pragmatic take on being a data scientist for AWS-based applications and systems.
Basically you can take typical AWS data sources, apply transformations, and
gather results into reports.

While AWS does indeed offer some services for the data handling on
different scales, a data scientist might want to crunch the data on-demand,
getting a feeling for things and answer questions right away before implementing
bigger architectural systems.

## Simple Example

Just a glimpse for you how it feels like to use this library (via typescript):

```typescript
import { Collect, Origin, Transform } from 'aws-data-science'
;async () => {
  // start the stream and `await` for the pipeline to end
  // here: just start a stream from a simple array
  const result = await new Origin.Array([1, 2, 3])
    // apply typical stream modifications, like filtering out bad data
    .pipe(new Transform.Filter(num => num % 2 === 0))
    // data must stream into something that collects it
    .pipe(new Collect.Array<number>())
    // every collector implements this, promise resolves when all is done
    .promise()
}
```

## Data Sources ("Origins")

All data sources (called "Origins") implement the `stream.Readable` interface
and must be the starting point of all data analysing efforts. The following
data sources can be used currently for data mining:

* [x] simple arrays
* [x] CloudWatch Logs
* [ ] CloudFront Logs (via S3)
* [ ] CloudTrail Logs
* [ ] Billing API

## Transformations

On every data stream, you can apply as many transformation steps as you wish.
Since the stream `pipe` data flow model applies backpressure nicely for you,
your computer should handle practically infinite loads of data without hassle.

## Aggregations

This is where data mining comes into play. You can `pipe` you data stream
into several "Aggregators" to generate additional data, for example counting
even numbers in a number stream. Or occurences of words within a text corpus.

* [x] Counter
* [x] Rank
* ...

## Collectors

Once your data pipeline has done everything you want, you must choose where the
data should end up. You might collect anything in an in-memory array, or store
stuff in files, or even discard everything completely since you only want some
aggregated informations.

* [x] Array
* [x] JSON-File
* [ ] Nothing

## Reporting Options

Bonus feature: different people want different reports. Some convenience
"visualization" tooling might get you started right away.

* [ ] JSON
* [ ] CSV
* [ ] Excel (xlsx)
* [ ] PDF
