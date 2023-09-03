export default class KafkaSerializer<T> {
  public serialize(data: T): Buffer {
    return Buffer.from(JSON.stringify(data));
  }
}
