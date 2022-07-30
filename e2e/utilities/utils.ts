var ini = require('ini')
var fs = require('fs')

function getEmailAddress(){
    var config = ini.parse(fs.readFileSync('e2e/configuration/config.ini', 'utf-8'))
    return config.credentials.login_email_address
}

function getPassword(){
    var config = ini.parse(fs.readFileSync('e2e/configuration/config.ini', 'utf-8'))
    return config.credentials.login_password
}

async function takeScreenshotAfterTestFailed(page: unknown, testInfo: unknown, testFileName: string) {
    if (testInfo.status != testInfo.expectedStatus) {
        console.log("Trying to take a screenshot of " + testInfo.title.substring(0, 60));
        var screenshot_file_dir = __dirname + "/../screenshots/" + testFileName.split(".")[0] + "/" + testInfo.title.substring(0, 60) + ".png";
        await page.screenshot({ path: screenshot_file_dir});
    }
}

export { getEmailAddress, getPassword, takeScreenshotAfterTestFailed }