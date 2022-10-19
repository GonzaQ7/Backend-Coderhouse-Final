const fs = require("fs");

class Container {
  constructor(filePath) {
    this.filePath = filePath;
    this.date = new Date();
  }

  async #readFile() {
    try {
      const res = await fs.promises.readFile(this.filePath, "utf-8");
      if (res.length === 0) {
        return res;
      } else {
        const content = JSON.parse(res);
        return content;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async #writeFile(data) {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify(data), "utf-8");
    } catch (e) {
      console.log(e);
    }
  }

  async save(data) {
    const messages = await this.#readFile();
    const today = new Date();
    const messageDate = today.toLocaleString();

    if (messages.length === 0) {
      await this.#writeFile([{ ...data, date: messageDate }]);
    } else {
      await this.#writeFile([...messages, { ...data, date: messageDate }]);
    }
  }

  async getAll() {
    const messages = await this.#readFile();
    return messages;
  }
}

const container = new Container("messages.txt");

module.exports = container;
