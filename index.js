const install = require("./install");
const getTime = require("./getTime");
const commands = process.argv.slice(" ");

if (commands[2] === "install") {
  if (!commands[3]) {
    console.log("Fill your secret key after install");
  } else {
    install(commands);
  }
} else {
  getTime(commands);
}
