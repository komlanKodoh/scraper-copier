import sqlite3 from "sqlite3";

type domainRecord = {
  domain: string;
  directory: string;
};
export default class DomainTracker {
  db: sqlite3.Database;
  hasBeenBackedUp: boolean = false;
  domainInMemory: { [key: string]: string };

  constructor(db: sqlite3.Database) {
    this.db = db;
    this.domainInMemory = {};
  }

  lookAtFile(url: URL, localDirectory: string) {
    if (this.lookUp(url)) return;

    this.domainInMemory[url.hostname] =
      localDirectory.split(url.hostname)[0] + url.hostname;
  }

  lookUp(url: URL) {
    if (this.domainInMemory[url.hostname]) {
      return this.domainInMemory[url.hostname] + url.hostname;
    } else if (this.hasBeenBackedUp) {
      console.log("Look into the database");
    }
  }

  async init() {
    // creation of a table
    await new Promise<void>((resolve, reject) => {
      this.db.run(
        `CREATE TABLE IF NOT EXISTS domainTracker ( hostname VARCHAR(200), directory VARCHAR(500) UNIQUE )`,
        () => resolve()
      );
    });

    return this;
  }

  async cleanExit() {
    const newDomain = Object.keys(this.domainInMemory)
      .map((domain) => `("${domain}", "${this.domainInMemory[domain] + domain}" )`)
      .join(",");

    return new Promise<void>((resolve) => {
      this.db.run(
        `INSERT INTO domainTracker (hostname, directory )
        VALUES ${newDomain};
        `,
        () => {
          resolve();
        }
      );
    });
  }

  getDirectories(hostname: string) {
    return new Promise<string[]>((resolve) => {
      this.db.all(`SELECT * FROM domainTracker;`, (_, rows: domainRecord[]) => {
        resolve(rows?.map((record) => record.directory));
      });
    });
  }

  async getRootDirectories(hostname: string){
    const directories  = await (await this.getDirectories(hostname));

    return directories.map(directory => directory.split(hostname)[0]);
  }

  
}
