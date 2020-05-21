#!/usr/bin/env node
const chalk = require('chalk');
const path = require('path');
const fs = require("fs-extra")
const { program } = require("commander")
const { version } = require("./package.json")
const _ = require("lodash")
const dayjs = require('dayjs')
const html = require("./lib/html.js")
const update = require("./lib/update.js")
const inquirer = require('inquirer')

const GetData = async () => {
    const JsonData = await fs.readJSON(path.join(__dirname, "./node_modules/caniuse-db/data.json"));
    // console.log(JsonData)
    const { updated } = _.pick(JsonData, "updated")
    const pickData = _.pick(JsonData, "data")
    return { updated, pickData }
}

const SearchKey = async key => {
    const { updated, pickData } = await GetData();
    const result = _.pick(pickData.data, key)
    const { stats } = result[key]
    let response = {};
    for await (let [key, value] of Object.entries(stats)) {
        const miniSupported = Object.entries(value).filter(v => v[1].includes("y"))[0]
        response[key] = miniSupported ? miniSupported.length > 1 ? miniSupported[0] + "*" : miniSupported[0] : ""
    }
    console.log(chalk.green("This browser support data is from Caniuse, which has more detail. A number indicates that browser supports the feature at that version and up."))
    console.log(chalk.red(`Updated at：${dayjs.unix(updated).format("dddd, MMMM D, YYYY h:mm A")}`))
    if (dayjs().isAfter(dayjs.unix(updated).add(30, 'day'))) {
        console.log(chalk.yellowBright(`Current data is outdated more than 30 days,Pls update.Use command 'caniuse update'`))
    }
    html(response)
}

program
    .version(version)
    .arguments('<key>')
    .action(async key => {
        if (typeof key === 'undefined') {
            console.error('请输入关键词!');
            process.exit(1);
        }
        if (key === 'update') {
            await update()
        } else {
            try {
                await SearchKey(key)
            } catch (error) {
                const { pickData } = await GetData()
                const { data } = _.pick(pickData, "data")
                const keys = Object.keys(data).filter(v => v.includes(key));
                inquirer.prompt([
                    {
                        type: "list",
                        name: "key",
                        message: "something wrong,would you want to search one of below?",
                        choices: keys
                    }
                ]).then(answers => {
                    console.log(answers)
                    SearchKey(answers.key)
                })
            }

        }
    });

program.parse(process.argv);

