# AWS Data Science

[![npm version](https://badge.fury.io/js/aws-data-science.svg)](https://badge.fury.io/js/aws-data-science)
[![Build Status](https://travis-ci.org/Anonyfox/aws-data-science.svg?branch=master)](https://travis-ci.org/Anonyfox/aws-data-science)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](http://www.gnu.org/licenses/lgpl-3.0)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

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
import { Aggregate, Collect, Origin, Transform } from 'aws-data-science';

async () => {
  // interesting for us: count some occurences of numbers by critera
  const counter = new Aggregate.Count(num => num > 3)

  // start the stream and `await` for the pipeline to end
  // here: just start a stream from a simple array of numbers
  const result = await new Origin.Array<number>([1, 2, 3, 4, 5, 6, 7])
    // apply typical stream modifications, like filtering out even numbers
    .pipe(new Transform.Filter<number>(num => num % 2 === 0))
    // data mining for some statistics: use counter from above
    .pipe(counter)
    // transform data one item at a time
    .pipe(new Transform.Map<number, number>(num => num + 1))
    // data must stream into something that collects it, like in-memory array
    .pipe(new Collect.Array<number>())
    // every collector implements this, promise resolves when all is done
    .promise()

  // output the results:
  console.log('result elements:', result) // => [ 3, 5, 7 ]
  console.log('counter:', counter.result()) // => 2
}
```

As you might notice, these are some functional building blocks implemented
on top of the node.js `stream` module with a charming API. When using via
typescript, there are also generics leveraged to aid you when building
your data pipelines (less debugging), this is optional for plain JS. Also,
you never have to implement `.on('data')` or `.on('end')` event handlers
when using Collectors, since they expose a `.promise()` which can be awaited
on.

It is also quite easy to parallelize multiple pipelines: don't `await` on
one, but stuff handlers of many pipelines into an array and await all of
them as you wish, like with `await Promise.all(myPipelines)`.

## Installation

`npm install -S aws-data-science`

This package also requires a peer dependency of `aws-sdk`.

## Data Sources ("Origins")

All data sources (called "Origins") implement the `stream.Readable` interface
and must be the starting point of all data analysing efforts. The following
data sources can be used currently for data mining:

* [x] `Origin.Array`: start stream from simple arrays
* [x] `Origin.String`: start stream from string, emits words
* [x] `Origin.CloudWatchLog`: stream CloudWatchLog entries
* [ ] CloudFront Logs (via S3)
* [ ] CloudTrail Logs
* [ ] Billing API
* [ ] DynamoDB Tables
* ...

## Transformations

On every data stream, you can apply as many transformation steps as you wish.
Since the stream `pipe` data flow model applies backpressure nicely for you,
your computer should handle practically infinite loads of data without hassle.

* [x] `Transform.Map`: same as `.map()` in javascript
* [x] `Transform.Filter`: same as `.filter()` in javascript
* [x] `Transform.ParseLambdaLog`: unifies multi-line event outputs from Lambda
* ...

## Aggregations

This is where data mining comes into play. You can `pipe` you data stream
into several "Aggregators" to generate additional data, for example counting
even numbers in a number stream. Or occurences of words within a text corpus.

* [x] `Aggregate.Count`: count truthy statements in stream
* [x] `Aggregate.List`: store things from the stream in an array
* [x] `Aggregate.Mean`: count numbers from the stream and return the mean value
* [x] `Aggregate.Rank`: count occurences of things and sort by highscore
* [x] `Aggregate.Sum`: add all numbers in a stream
* ...

## Collectors

Once your data pipeline has done everything you want, you must choose where the
data should end up. You might collect anything in an in-memory array, or store
stuff in files, or even discard everything completely since you only want some
aggregated informations.

* [x] `Collect.Array`: stream sink as simple array
* [x] `Collect.JsonFile`: stream sink directly into JSON array file
* [x] `Collect.Nothing`: when you don't need the data any longer
