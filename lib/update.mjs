import { exec } from 'child_process';
import ora from 'ora';
import util from 'util';
const spinner = ora('updating data');
const cexec = util.promisify(exec);
//update data;
export default async () => {
    spinner.start()
    try {
        await cexec("npm install caniuse-db@latest")
        spinner.stop()
    } catch (err) {
        console.log(err)
        spinner.failed()
    }
}
