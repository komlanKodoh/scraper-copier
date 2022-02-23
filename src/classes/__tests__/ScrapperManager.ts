import path from "path"
import sqlite3  from "sqlite3";
import { randomString } from "../../utils";
import createSqliteDb from "../../utils/createSqliteDb"
import ScraperManager from "../ScraperManager";


// Generate random list of string to use as url
const LINK_TESTS = new Array(10).fill(undefined).map(_ => randomString(20));

describe("Testing the scrapperManager",  () => {
    let db: sqlite3.Database  ;
    let scraperManager: ScraperManager;

    beforeAll(async () => {
        db = await  createSqliteDb(path.join(__dirname, "./testdB"  ));
        scraperManager = new ScraperManager(db,"randomNameShit");
    })

    it("Should init successfully", async () => {

        await scraperManager.init([LINK_TESTS[0]], true);

        const linkRow = await scraperManager.find(LINK_TESTS[0])
        
        expect(linkRow).toBeTruthy();
        expect(linkRow?.link).toEqual(LINK_TESTS[0]);
    })

    it("should change Link Visibility", async () => {
        await scraperManager.init([LINK_TESTS[0]])

        await scraperManager.see(LINK_TESTS[0]);

        const linkRow = await scraperManager.find(LINK_TESTS[0]);

        expect(linkRow?.seen).toEqual(1)
    })

    it("Should add link to database", async () => {
        await (await scraperManager.init([], true)).add(LINK_TESTS.slice(0,5));

        const allLink = await scraperManager.findNext(600000);

        expect(allLink.map(linkRow => linkRow.link)).toEqual(LINK_TESTS.slice(0,5));
    })

    

})