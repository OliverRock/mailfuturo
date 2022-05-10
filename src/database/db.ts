import { Message } from '@/interfaces/message.interface';
import { Pool } from 'pg';

class DB {
  private static instance: DB;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      user: 'oliverrock',
      password: 'MasterQueen69',
      host: '127.0.0.1',
      port: 5432,
      database: 'mailfuturo',
    });
  }

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  public async addNewMessage(emailAdress: string, messageContent: string) {
    this.pool.query('INSERT INTO message (email_address, message_text, isValidated) VALUES ($1, $2, $3)', [emailAdress, messageContent, false]);
  }
}

export default DB;
