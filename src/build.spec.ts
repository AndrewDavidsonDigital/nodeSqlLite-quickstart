import { expect, test } from 'vitest'
import fs from 'fs';

/**
 * Ensure `package-lock.json`, generated via npm install, doesn't exist
 */
test('Ensure no NPM compiled file in root dir', () => {
  const fileThatShouldNotExist = 'package-lock.json';

  const rootFolderContents = fs.readdirSync('./', 'utf-8');

  expect(rootFolderContents.indexOf(fileThatShouldNotExist)).toBe(-1);
})