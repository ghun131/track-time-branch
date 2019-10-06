const install = commands => {
  const fs = require("fs");

  const bufferKey = commands[3] && Buffer.from(commands[3]);
  const apiKeyBase64 = bufferKey && bufferKey.toString("base64");
  const payload = JSON.stringify({ key: apiKeyBase64 });
  fs.writeFile("key.json", payload, err => {
    if (err) throw err;
    console.log("Done installing!");
  });
};

module.exports = install;
