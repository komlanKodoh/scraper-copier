import MySql from "../../deprecated/MySql";
import SqLite from "../SqLite";
import { sql } from "../../utils/sql";

const LINK_TEST = [
  "https://komlankodoh.com",
  "https://dummylink.com",
  "https://thirdlikn.com",
  "https://fourlink.com",
  "https://sixthlink.com",
  "https://lastlink.com",
];

jest.setTimeout(10000);
for (const db of [new SqLite, new MySql]){
  describe(`Testing implementation of databases : ${db.name}`, () => {
    const db = new MySql()
  
  
    it("Should initialized successfully", async () => {
      await db.init(["https://komlankodoh.com", "https://dummylink.com"]);
      await new Promise<void>((resolve) => {
        db.db.all(sql`select * from link`, (error, rows) => {
          expect(rows[0]).toEqual({
            link: "https://komlankodoh.com",
            popularity: 7,
            seen: 0,
          });
          expect(rows[1]).toEqual({
            link: "https://dummylink.com",
            popularity: 6,
            seen: 0,
          });
          resolve();
        });
      });
    });
  
    it("Should successfully ad links", async () => {
      await db.add(LINK_TEST);
  
      await new Promise<void>((resolve) => {
        db.db.all(
          sql`select * from link Where link="${LINK_TEST[2]}"`,
          (error, rows) => {
            if (error) {
              console.error(error);
            }
            expect(rows[0]).toEqual({
              link: LINK_TEST[2],
              popularity: 1,
              seen: 0,
            });
            resolve();
          }
        );
      });
    });
  
    it("Should Increment on duplicate", async () => {
      await db.add(LINK_TEST);
  
      await new Promise<void>((resolve) => {
        db.db.all(
          sql`select * from link Where link="${LINK_TEST[2]}"`,
          (error, rows) => {
            expect(rows[0]).toEqual({
              link: LINK_TEST[2],
              popularity: 2,
              seen: 0,
            });
            resolve();
          }
        );
      });
    });
  
    it("Should see links successfully ", async () => {
      await db.see(LINK_TEST[2]);
  
      await new Promise<void>((resolve) => {
        db.db.all(
          sql`select * from link Where link="${LINK_TEST[2]}"`,
          (error, rows) => {
            expect(rows[0]).toEqual({
              link: LINK_TEST[2],
              popularity: 2,
              seen: 1,
            });
            resolve();
          }
        );
      });
    });
  
    it("Should find next five link successfully", async () => {
      const next = await db.find_next(5);
  
      let seen_link_is_present = false;
      next.forEach((link) => {
        if (link.link == LINK_TEST[2]) seen_link_is_present = true;
      });
  
      expect(seen_link_is_present).toBe(false);
    });
  });
  
}
