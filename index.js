const core = require('@actions/core');
const fetch = require('node-fetch');
// const wait = require('./wait');

// most @actions toolkit packages have async methods
async function run() {
  try { 
    // const ms = core.getInput('milliseconds');
    // console.log(`Waiting ${ms} milliseconds ...`)
    // core.debug((new Date()).toTimeString())
    // await wait(parseInt(ms));
    // core.debug((new Date()).toTimeString())
    console.log('Adding to online timer queue...');

    const userId = core.getInput('userId');
    const expiryMins = core.getInput('expiryMins');
    const getUrl = core.getInput('getUrl');
    const postUrl = core.getInput('postUrl');
    const postPayload = core.getInput('postPayload');
    const method = getUrl ? 'GET' : 'POST';

    await fetch('https://still-sky-c17a.gha.workers.dev/?userId=' + userId, {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        expiryMins,
        getUrl: getUrl,
        postUrl: postUrl,
        postPayload: postUrl ? postPayload : '',
        createdAt: new Date().toISOString()
      })
    })
    console.log(`Added. After ${expiryMins} mins, trigger this URL: ${method} ${getUrl || postUrl} ${postPayload}`);

    core.setOutput('time', new Date().toTimeString());
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
