import { 
  FLAG_IS_SERVER, 
  KEYS_FLAGS, 
  VALID_KEYS,
} from "./args";
import { bootServer } from "./server";


const localArgs = [...process.argv];
const runningArgs = new Map<string, string| boolean>();

validateArgs(localArgs);

console.log(runningArgs);

if (runningArgs.get(FLAG_IS_SERVER)){
  bootServer();
}

function validateArgs(argv: string[]) {

  for (let i=0; i < argv.length; i++){
    const arg = argv[i];
    console.log(`Arg: [${arg}]`);

    // check validity:
    if (VALID_KEYS.indexOf(arg) === -1){
      console.log(`\t unknown, skipping`);
      continue;
    }

    // is this a flag
    // else its an input
    if (KEYS_FLAGS.indexOf(arg) !== -1){
      runningArgs.set(arg, true);
    } else {
      const nextArg = argv[i + 1];
      if (nextArg.startsWith('-')){
        console.log(`\t invalid input format, input value can't start with a hyphen '-'`);
        continue;
      }

      // skip flag checking for next
      i++;
      runningArgs.set(arg, nextArg);
    }
  }
}
