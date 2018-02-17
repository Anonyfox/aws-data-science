export default class CloudWatchLogEvent {
  /**
   * the actual string content of the Event
   */
  message: string

  /**
   * custom field for sorting lists eof events when needed
   */
  id: string

  /**
   * persist arbitrary metadata here
   */
  private meta: object = {}

  /**
   *
   * @param id set to whatever, like aws lambda RequestId
   * @param message payload
   */
  constructor(id, message) {
    this.id = id
    this.message = message
  }

  setMeta(key: string, value: any) {
    this.meta[key] = value
  }
}
