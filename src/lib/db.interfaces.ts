import { Database } from "sqlite3";

export interface IUserRow {
  id: number;
  firstName?: string;
  lastName?: string;
  age?: number;
}

export interface IVolatileRow {
  id: number;
  data: string;
}

export interface IConnectionInstance {
  initd: boolean;
  connection: null | Database;
}

export const state: IConnectionInstance = {
  initd: false,
  connection: null,
}
