import { logger } from '@/utils/logger';
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

  public async addNewMessage(emailAddress: string, delivery_date: Date, messageContent: string) {
    return this.pool
      .query('INSERT INTO message (email_address, message_text, delivery_date, isValidated, delivered) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
        emailAddress,
        messageContent,
        delivery_date,
        false,
        false,
      ])
      .then(res => {
        logger.info(`New message saved to DB: ${emailAddress}`);
        return res;
      });
  }

  public async validateEmailAddress(messageId: number) {
    this.pool.query('UPDATE message SET isValidated = true WHERE pk = $1', [messageId]);
  }

  public async getAllMessagesToDeliverToday(today: Date) {
    this.pool.query('SELECT * FROM message WHERE delivery_date = $1 AND isValidated = $2 AND delivered = $3', [today, true, false]).then(res => {
      console.log(res);
    });
  }
}

export default DB;
