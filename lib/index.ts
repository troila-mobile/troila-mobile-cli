#!/usr/bin/env node

import * as commander from "commander";
const version = require("../package.json").version;
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as colors from 'colors'
import {
    setProjectName,
    compareVersion,
    mode,
    type,
} from './utils'
import {
    dir,
    viewTemplate,
} from './generate'
import { execSync } from "child_process";
import * as path from 'path'


commander
    .version(version, "-V, --version")
    .usage("[Options] | [Commands] <file>")

commander
    .command('init')
    .description('generation a webpack project')
    .option('dir')

commander
    .command('view')
    .description('generation a react component')
    .option('<file>')

commander.on('--help', function () {
    console.log('\n Examples:');
    console.log('');
    console.log('  $ troila-mobile -h');
    console.log('  $ troila-mobile init troila-mobile-demo ');
    console.log('');
});

function help() {
    commander.parse(process.argv)
    if (commander.args.length < 1) return commander.help()
}
help()


const release = async () => {
    const nodeVersion = execSync("node -v", { encoding: "utf8" });
    if (process.argv.length === 2) {
        execSync('troila-mobile -h')
    }
    if (!compareVersion(nodeVersion)) {
        console.log('Please make sure the node version is above 8.0'.red);
        process.exit();
    }
    const argv2 = process.argv[2];
    const argv3 = process.argv[3];
    if (argv2 === 'init') {
        let projectName = argv3;
        if (!projectName) {
            projectName = await setProjectName()
        } else if (fs.existsSync(projectName)) {
            console.log('\n the dir has exists, please input another one'.green + '\n');
            projectName = await setProjectName();
        }

        const reactMode = await mode();
        projectName = projectName || global['projectName'];
        fs.mkdirSync(projectName);
        const currentPath = path.resolve(__dirname, '..')
        const directory = currentPath + type(reactMode.flag);
        dir(directory, projectName)
    } else if (argv2 === 'view') {
        viewTemplate(argv3)
    }
}


release().catch(err => {
    console.error(err);
    process.exit();
});

commander.parse(process.argv);