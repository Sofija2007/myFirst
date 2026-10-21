import SqLite from "./sqlite.js";

export default class Migration {

  constructor() {
    this.linker = new SqLite('./database.db');
  }

  async #exec(sql) {
    if (typeof sql !== 'string' || sql.trim().length === 0 ) {
      console.error("Ошибка");
      return;
    }
    try {
      await this.linker.connect();
      await this.linker.run(sql);
    }
    catch(error) {
      console.error('Ошибка: ', error);
      throw error;
    }
    finally {
      if (this.linker) {
        await this.linker.close();
      }
    }
  }

  async up(sql) {
    return await this.#exec(sql);
  }

  async down(sql) {
    return await this.#exec(sql);
  }
}