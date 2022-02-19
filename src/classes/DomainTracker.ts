import path from "path";
import sqlite3 from "sqlite3";
import getPathAndFileName from "../lib/getPathAndFileName";

type domainRecord = {
  hostname: string;
  directory: string;
};
export default class DomainTracker {
  db: sqlite3.Database;
  hasBeenBackedUp: boolean = false;
  domainInMemory: { [key: string]: Set<string> };

  constructor(db: sqlite3.Database) {
    this.db = db;
    this.domainInMemory = {};
  }

  /**
   * Ensures that a domain has an associated set in the domain dictionary saved in Memory {this.domainInMemory}
   *
   * @param hostname
   */

  ensureHostname(hostname: string) {
    if (!this.domainInMemory[hostname])
      this.domainInMemory[hostname] = new Set();
  }

  /**
   * Add a local path to list of path existing for a given host / domain.
   *
   * @param hostname
   * @param path
   */
  addPathToHost(hostname: string, path: string) {
    this.ensureHostname(hostname);
    this.domainInMemory[hostname].add(path);
  }

  /**
   * Given an url and a localDirectory, it ensures that the hostname - localDirectory combination has been
   * saved. If not, it saves the combination.
   *
   * @param url
   * @param localDirectory
   * @returns
   */
  lookAtFile(url: URL, localDirectory: string) {
    if (this.lookUp(url)) return;

    this.addPathToHost(
      url.hostname,
      localDirectory.split(url.hostname)[0] + url.hostname
    );
  }

  lookUp(url: URL) {
    if (this.domainInMemory[url.hostname]) {
      return this.domainInMemory[url.hostname];
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
    return await this.backUp();
  }

  backUp() {
    const newDomain = Object.keys(this.domainInMemory)
      .map((domain) =>
        [...this.domainInMemory[domain]].map(
          (domainPath) => `("${domain}", "${domainPath}" )`
        )
      )
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

  private getDirectoriesFromDB(hostname: string) {
    this.ensureHostname(hostname);
    return new Promise<string[]>((resolve) => {
      this.db.all(
        `SELECT * FROM domainTracker Where hostname="${hostname}";`,
        (_, rows: domainRecord[]) => {
          const directories = rows?.map((record) => record.directory);

          directories?.forEach((directory) =>
            this.domainInMemory[hostname].add(directory)
          );

          resolve(directories || []);
        }
      );
    });
  }

  getDirectories(hostname: string) {
    if (this.domainInMemory[hostname]) {
      this.getDirectoriesFromDB(hostname);

      return [...this.domainInMemory[hostname]];
    }
    return this.getDirectoriesFromDB(hostname);
  }

  async getRootDirectories(hostname: string) {
    const directories = await await this.getDirectories(hostname);

    return directories.map((directory) => directory.split(hostname)[0]);
  }

  getAllDomains(): Promise<string[]> {
    
    return new Promise((resolve ) => {
      this.db.all(
        `SELECT DISTINCT hostname FROM domainTracker;`,
        (_, rows: domainRecord[]) => {

          resolve( rows.map(row => row.hostname) || []);
        }
      );
    })
  }
}
