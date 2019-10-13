import fs from "fs";
import fetch from "node-fetch";
import moment from "moment";
import chalk from "chalk";
import logSymbol from "log-symbols";
import prettyOutput from "./prettyOutput";
const pathName = __dirname.split("/");

const formatTime = seconds => {
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor((seconds / 60 - minutes) * 60);
    const timeFormat = minutes + "m " + secondsLeft + "s";
    return timeFormat;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutesLeft = Math.floor((seconds / 3600 - hours) * 60);
    const secondsLeft = Math.floor(seconds - hours * 3600 - minutesLeft * 60);
    const timeFormat = hours + "h " + minutesLeft + "m " + secondsLeft + "s";
    return timeFormat;
  }
};

const fetchData = (base64Key, commands) => {
  const projectName = commands[2] ? commands[2] : pathName[pathName.length - 2];
  const today = moment()
    .format()
    .slice(0, 10);
  const startedDateArr = moment()
    .subtract(13, "days")
    .calendar()
    .split("/");
  const startedDateStr = `${startedDateArr[2]}-${startedDateArr[0]}-${
    startedDateArr[1]
  }`;
  return fetch(
    `https://wakatime.com/api/v1/users/current/summaries?start=${startedDateStr}&end=${today}&project=${projectName}&cache=true`,
    {
      method: "GET",
      headers: {
        // Authorization using key bas64 is a bad practice => build a server to handle authentication later
        Authorization: `Basic ${base64Key}`
      }
    }
  )
    .then(response => response.text())
    .catch(err => console.error(err));
};

async function getBase64Key() {
  const promise = new Promise((resolve, reject) => {
    fs.readFile("key.json", { encoding: "utf-8" }, (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
  return await promise;
}

async function getTime(commands) {
  const base64Key = await getBase64Key();
  const { key } = JSON.parse(base64Key);

  let result = await fetchData(key, commands);
  if (result) {
    result = JSON.parse(result);
  }

  const availBraches = result.available_branches;
  const branchesWithTime = result.data.reduce(
    (acc, val) => [...acc, ...val.branches],
    []
  );
  const presentTime = branchesWithTime.reduce((acc, val) => {
    if (availBraches.includes(val.name)) {
      acc[val.name] = formatTime(val.total_seconds);
    }
    return acc;
  }, {});
  if (Object.keys(presentTime).length === 0) {
    console.log(logSymbol.error, chalk.bold.red("Error, please try again!"));
    return;
  }
  prettyOutput(presentTime)
  // format the result
}

export default getTime;
