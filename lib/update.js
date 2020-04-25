const ora = require('ora');
const spinner = ora('updating data');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
//update data;
module.exports = async () => {
    spinner.start()
    try {
        await exec("npm install caniuse-db@latest")
        spinner.stop()
    } catch (err) {
        console.log(err)
        spinner.failed()
    }
    return;
}