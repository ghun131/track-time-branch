// get current repo name for standard case

const fetch = require('node-fetch');
const moment = require('moment');
const pathName = __dirname.split('/');
const commands = process.argv.slice(' ');
let projectName = pathName[pathName.length - 1];
if (commands[2]) {
  projectName = commands[2];
}
const today = moment().format().slice(0, 10);
const startedDateArr = moment().subtract(13, 'days').calendar().split('/');
const startedDateStr = `${startedDateArr[2]}-${startedDateArr[0]}-${startedDateArr[1]}`

const fetchData = () => {
  return fetch(
    `https://wakatime.com/api/v1/users/current/summaries?start=${startedDateStr}&end=${today}&project=${projectName}&cache=true`,
    {
      method: "GET",
      headers: {
        // This authorization use secret key in base64 which is a very bad practice
        Authorization: "Basic OGM0NTZhZmYtMWUzNC00YTMxLTg4YjQtMTk2MWY4NjNkOTNj"
      }
    }
  )
    .then(response => response.text())
    .catch(err => console.error(err));
}

const formatTime = (seconds) => {
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor((seconds / 60 - minutes) * 60);
    const timeFormat = minutes + 'm ' + secondsLeft + 's';
    return timeFormat;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutesLeft = Math.floor((seconds / 3600 - hours) * 60);
    const secondsLeft = Math.floor(seconds - hours * 3600 - minutesLeft * 60);
    const timeFormat = hours + 'h ' + minutesLeft + 'm ' + secondsLeft + 's'
    return timeFormat;
  }
}

(async () => {
let result = await fetchData();
  if (result) {
    result = JSON.parse(result);
  }
const availBraches = result.available_branches
const branchesWithTime = result.data.reduce((acc, val) => [...acc, ...val.branches], []);
const presentTime = branchesWithTime.reduce((acc, val) => {
  if (availBraches.includes(val.name)) {
    acc[val.name] = formatTime(val.total_seconds);
  }
  return acc
}, {})
  // use chalk to color the output
  console.log(presentTime)
})()
