import install from "./install";
import getTime from "./getTime";
import chalk from "chalk";
import logSymbol from 'log-symbols';

const app = params => {
  const commands = params.slice(" ");
  if (commands[2] === "--install") {
    if (!commands[3]) {
      console.log(
        logSymbol.error,
        chalk.red.bold("Error: fill your secret key after install!")
      );
    } else {
      install(commands);
    }
  } else {
    getTime(commands);
  }
};

export default app;
