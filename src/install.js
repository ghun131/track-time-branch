import fs from 'fs'
import chalk from 'chalk';
import logSymbol from 'log-symbols';

const install = commands => {
  const bufferKey = commands[3] && Buffer.from(commands[3]);
  const apiKeyBase64 = bufferKey && bufferKey.toString("base64");
  const payload = JSON.stringify({ key: apiKeyBase64 });
  fs.writeFile("key.json", payload, err => {
    if (err) throw err;
    console.log(logSymbol.success, chalk.bold.green("Done installing!"));
  });
};

export default install