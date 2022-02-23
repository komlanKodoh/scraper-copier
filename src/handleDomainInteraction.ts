import path from "path";
import DomainTracker from "./classes/DomainTracker";
import Logger from "./classes/Logger";
import createSqliteDb from "./utils/createSqliteDb";

const actionDict = {
  domain_show: async (domainTracker: DomainTracker) => {
    const scrappedDomains = await domainTracker.getAllDomains();

    console.log(`\n${scrappedDomains.join("\n")}\n`);
  },
};

const domainHandler = async (cli_args: any) => {
  
  const dbPath = cli_args.database
    ? path.join(process.cwd(), cli_args.database)
    : path.join(__dirname, ".default_scraper.db");

  const db = await createSqliteDb(dbPath, () => null);

  if (!db)
    return console.log(
      Logger.color("could not connect to the database. ", "FgRed")
    );

  const domainTracker = new DomainTracker(db);

  const command = cli_args._.join("_") as keyof typeof actionDict;

  if (!actionDict[command])
    console.log(Logger.color("Invalid command", "FgRed"));

  actionDict[command](domainTracker);
};

export default domainHandler;
