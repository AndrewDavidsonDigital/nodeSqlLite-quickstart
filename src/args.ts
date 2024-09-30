export const FLAG_IS_SERVER = '-s'

export const INPUT_FILE = '-f'

export const KEYS_FLAGS: Readonly<Set<string>> = new Set<string>([
  FLAG_IS_SERVER,
]);

export const KEYS_INPUTS: Readonly<Set<string>> = new Set<string>([
  INPUT_FILE,
]);

export const VALID_KEYS: Readonly<Set<string>> = new Set<string>([
  ...KEYS_FLAGS,
  ...KEYS_INPUTS,
])
