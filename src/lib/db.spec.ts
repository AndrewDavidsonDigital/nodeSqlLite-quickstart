import { dbConnection } from  './db';
import { expect, test } from 'vitest'


test('db init always returns same instance', async () => {
  const connection = dbConnection();

  const first = (await connection.init()).connection;
  const second = (await connection.init()).connection;
  const third = (await connection.init()).connection;

  
  // ensure we have a valid connection object
  expect(first).not.toBeNull();

  // ensure the 
  expect(first).toStrictEqual(second);
  expect(first).toStrictEqual(third);

  // superfluous test as if a === b and a === c then b === c
  // but added for visual completion
  expect(second).toStrictEqual(third); 
})
