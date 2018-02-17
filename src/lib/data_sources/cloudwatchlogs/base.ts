export class CloudWatchLogs {
  logGroupName: string
  region: string

  constructor(logGroupName: string, region?: string) {
    this.logGroupName = logGroupName
    this.region = region || 'eu-central-1'
  }
}
