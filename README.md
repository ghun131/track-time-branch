This package built by using WakaTime api to track the amount of time you spend on your IDE

## Installation
#### First step: Install project-time to your local repository
```
npm i project-time
```
or
```
yarn add project-time
```
Remember to register your wakatime account before running this. If you haven't had an account, make a quick visit to [Waka main page](https://wakatime.com/)


#### Second step: Provide your secret api key 
To get `<your_secret_api_key>`, please go to [Waka Time](https://wakatime.com/settings/account)
```
tell-time --install <your_secret_api_key>
```
__Note__: Sometime this command doesn't work, you may need to type `npm link project-time` to make the symlink for `tell-time` cli

## Usage
To get the amount of time you spend on your opening project (your current folder)
```
tell-time
```

With other project, please enter
```
tell-time <project-name>
```
