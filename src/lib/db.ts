import { sqlite3 } from 'sqlite3';
import { IUserRow, IVolatileRow, state } from './db.interfaces';
import { IQueryParams } from '../interfaces';
// DB Init
const sqlite3Instance = require('sqlite3') as sqlite3;

export function dbConnection() {
  return {
    /**
     * @description construct a new or return an existing db connection
     * @returns IConnectionInstance representation of the db communication object.
     */
    'init'          : () => init(),
    /**
     * @description return all users within the connected database
     * @throws if access to the database has not be defined yet.
     * @returns Array<IUserRow> representation of the user, void and throws otherwise
     */
    'getUsers'      : async () => await getUsers(),
    /**
     * @description write the query params into the volatiles db
     * @throws if access to the database has not be defined yet.
     * @returns void
     */
    'addVolatile'   : async (data: IQueryParams[]) => await addVolatile(data),
    /**
     * @description return a single volatile data-point if it exists
     * @param id for the data-point to access 
     * @throws if access to the database has not be defined yet.
     * @returns IVolatileRow representation of the data-point, void and throws otherwise
     */
    'getVolatile'   : async (data: number) => await getVolatile(data),
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


/**
 * @description write the query params into the volatiles db
 * @throws if access to the database has not be defined yet.
 * @returns void
 */
function addVolatile(data: IQueryParams[]): Promise<void>{
  return new Promise((resolve, reject) => {
    if (!(state.initd) || state.connection === null){
      console.log('__Up check fail');
      reject('Database connection not yet initialized');
      throw new Error('Database connection not yet initialized');
    }

    const dataToAdd = JSON.stringify(data);

    state.connection.run("INSERT INTO volatiles(data) VALUES(?)", [dataToAdd], (error) => {
      if (error){
        console.log('__Error in sql', error);
        reject('Database connection not yet initialized');
      }
      resolve();
    });
  });
}

/**
 * @description return a single volatile data-point if it exists
 * @param id for the data-point to access 
 * @throws if access to the database has not be defined yet.
 * @returns IVolatileRow representation of the data-point, void and throws otherwise
 */
function getVolatile(id: number): Promise<void | IVolatileRow>{
  return new Promise((resolve, reject) => {
    if (!(state.initd) || state.connection === null){
      reject('Database connection not yet initialized');
      throw new Error('Database connection not yet initialized');
    }
    state.connection.all(
      "SELECT * FROM volatiles where id=$id", {
        $id: id,
      }, (error, rows: IVolatileRow[]) => {
        if (error){
          reject('Database connection not yet initialized');
        }
        resolve(rows[0]);
      }
    );
  });
}