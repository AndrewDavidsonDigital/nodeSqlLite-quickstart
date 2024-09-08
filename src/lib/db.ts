import { sqlite3 } from 'sqlite3';
import { IUserRow, state } from './db.interfaces';
// DB Init
const sqlite3Instance = require('sqlite3') as sqlite3;

export function dbConnection() {
  return {
    /**
     * @description construct a new or return an existing db connection
     * @returns IConnectionInstance representation of the db communication object.
     */
    'init'  : () => init(),
    /**
     * @description return all users within the connected database
     * @throws if access to the database has not be defined yet.
     * @returns Array<IUserRow> representation of the user, void and throws otherwise
     */
    'getUsers'  : async () => await getUsers(),
  }
}

/**
 * @description construct a new or return an existing db connection
 * @returns IConnectionInstance representation of the db communication object.
 */
async function init(){
  if (state.initd){
    return state;
  }

  state.initd = true;
  const db = new sqlite3Instance.Database('./.db/quickstart.db');

  state.connection = db;

  return state;
}


/**
 * @description return all users within the connected database
 * @throws if access to the database has not be defined yet.
 * @returns Array<IUserRow> representation of the user, void and throws otherwise
 */
function getUsers(): Promise<void | IUserRow[]>{
  return new Promise((resolve, reject) => {
    if (!(state.initd) || state.connection === null){
      reject('Database connection not yet initialized');
      throw new Error('Database connection not yet initialized');
    }
    state.connection.all("SELECT * FROM users", (error, rows: IUserRow[]) => {
      if (error){
        reject('Database connection not yet initialized');
      }
      resolve(rows);
    });
  });
}
