export class DeleteEmailNotificationEventDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly sender: string,
    public readonly recipient: string,
  ) {}

  toString() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      description: this.description,
      sender: this.sender,
      recipient: this.recipient,
    });
  }
}
