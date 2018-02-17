# AWS Data Science

Pragmatic take on being a data scientist for AWS-based applications and systems.
Basically you can take typical AWS data sources, apply transformations, and
gather results into reports. You can choose different processing styles,
depending on the type/size of the data:

* [x] synchronous: fastest and easiest, but best for data sizes less than 1GB
* [ ] streaming: process one thing (mostly: lines) at a time. best for long logs
* [ ] service: server mode for processing incoming data events in realtime

## Data Sources

* [ ] CloudWatch Logs
* [ ] CloudFront Logs (via S3)
* [ ] CloudTrail Logs

## Transformations

* [x] counting occurences
* [x] ordering of arrays/object keys

## Reporting Options

* [ ] JSON
* [ ] CSV
* [ ] Excel (xlsx)
* [ ] PDF
