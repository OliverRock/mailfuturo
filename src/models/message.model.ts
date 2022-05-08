import { Message } from '@/interfaces/message.interface';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type MessageCreationAttributes = Optional<Message, 'id' | 'email' | 'message' | 'isValidated'>;

export class MessageModel extends Model<Message, MessageCreationAttributes> implements Message {
  public id: number;
  public email: string;
  public message: string;
  public isValidated: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof MessageModel {
  MessageModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      isValidated: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: 'messages',
      sequelize,
    },
  );

  return MessageModel;
}
