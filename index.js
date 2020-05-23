const core = require('@actions/core');
const fetch = require('node-fetch');
// const wait = require('./wait');

// most @actions toolkit packages have async methods
async function run() {
  try { 
    // const ms = core.getInput('milliseconds');6
    // console.log(`Waiting ${ms} milliseconds ...`)
    // core.debug((new Date()).toTimeString())
    // await wait(parseInt(ms));
    // core.debug((new Date()).toTimeString())
    console.log('v0.1.0');
    console.log('Adding this to online queue...');

    const userId = core.getInput('userId');
    const expiryMins = core.getInput('expiryMins');
    const getUrl = core.getInput('getUrl');
    const postUrl = core.getInput('postUrl');
    const postPayload = core.getInput('postPayload');

    await fetch('https://still-sky-c17a.gha.workers.dev/?userId=' + userId, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        expiryMins,
        getUrl: getUrl,
        postUrl: postUrl,
        payload: postUrl ? postPayload : '',
        createdAt: new Date().toISOString()
      })
    })
    console.log(`Added. After ${expiryMins} mins, trigger this URL: ${getUrl || postUrl}`);

    core.setOutput('time', new Date().toTimeString());
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
