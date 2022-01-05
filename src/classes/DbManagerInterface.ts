import { link } from "../types/global";

export default interface DbManager {
  db: {};
  name: string;
  add: (links: string[]) => void;
  delete: (link: string) => void;
  see: (location: string) => Promise<void>;
  init: (...links: string[]) => Promise<void>;
  find_next: (limit: number) => Promise<link[]>;
}
