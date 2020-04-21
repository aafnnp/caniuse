const got = require("got")
const ora = require('ora');

const spinner = ora('updating data');
//update data;
module.exports =async () => {
    spinner.start()
    try {
        await got("https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json");
        spinner.stop()
    }catch(err) {
        spinner.failed()
    }
}