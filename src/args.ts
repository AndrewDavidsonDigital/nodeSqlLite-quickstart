export const FLAG_IS_SERVER = '-s'

export const INPUT_FILE = '-f'

export const KEYS_FLAGS = Object.freeze([
  FLAG_IS_SERVER,
]);

export const KEYS_INPUTS = Object.freeze([
  INPUT_FILE,
]);

export const VALID_KEYS = Object.freeze([
  ...KEYS_FLAGS,
  ...KEYS_INPUTS,
])
