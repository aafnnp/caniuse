#!/usr/bin/env node
import axios from "axios";
import chalk from "chalk";
import { program } from "commander";
import dayjs from "dayjs";
import inquirer from "inquirer";
import { pick } from "lodash-es";
import { createRequire } from "module";
import ora from 'ora';
import html from "./lib/html.mjs";
import update from "./lib/update.mjs";
const require = createRequire(import.meta.url);
const {version} = require("./package.json");
const spinner = ora("updating data");

const GetData = async () => {
	try {
		spinner.start();
		const response = await axios("https://raw.githubusercontent.com/Fyrd/caniuse/main/data.json");
		const {updated} = pick(response.data, "updated");
		const pickData = pick(response.data, "data");
		spinner.stop();
		return {updated, pickData};
	} catch (error) {
		spinner.failed();
	}
};

const SearchKey = async key => {
	const {updated, pickData} = await GetData();
	const result = pick(pickData.data, key);
	const {stats} = result[key];
	let response = {};
	for await (let [key, value] of Object.entries(stats)) {
		const miniSupported = Object.entries(value).filter(v => v[1].includes("y"))[0];
		response[key] = miniSupported ? (miniSupported.length > 1 ? miniSupported[0] + "*" : miniSupported[0]) : "";
	}
	console.log(
		chalk.green(
			"This browser support data is from Caniuse, which has more detail. A number indicates that browser supports the feature at that version and up."
		)
	);
	console.log(chalk.red(`Updated at：${dayjs.unix(updated).format("dddd, MMMM D, YYYY h:mm A")}`));
	if (dayjs().isAfter(dayjs.unix(updated).add(30, "day"))) {
		console.log(
			chalk.yellowBright(`Current data is outdated more than 30 days,Pls update.Use command 'caniuse update'`)
		);
	}
	html(response);
};

program
	.version(version)
	.arguments("<key>")
	.action(async key => {
		if (typeof key === "undefined") {
			console.error("请输入关键词!");
			process.exit(1);
		}
		if (key === "update") {
			await update();
		} else {
			try {
				await SearchKey(key);
			} catch (error) {
				const {pickData} = await GetData();
				const {data} = pick(pickData, "data");
				const keys = Object.keys(data).filter(v => v.includes(key));
				inquirer
					.prompt([
						{
							type: "list",
							name: "key",
							message: "something wrong,would you want to search one of below?",
							choices: keys
						}
					])
					.then(answers => {
						console.log(answers);
						SearchKey(answers.key);
					});
			}
		}
	});

program.parse(process.argv);
