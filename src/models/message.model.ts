import { Message } from '@/interfaces/message.interface';

export class MessageModel implements Message {
  messageContent: string;
  id: number;
  email: string;
  isValidated: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
