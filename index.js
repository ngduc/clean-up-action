const core = require('@actions/core');
const wait = require('./wait');


// most @actions toolkit packages have async methods
async function run() {
  try { 
    // const ms = core.getInput('milliseconds');6
    // console.log(`Waiting ${ms} milliseconds ...`)
    // core.debug((new Date()).toTimeString())
    // await wait(parseInt(ms));
    // core.debug((new Date()).toTimeString())

    const userId = core.getInput('userId');
    await fetch('https://still-sky-c17a.gha.workers.dev/?userId=' + userId, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        expiryMins: core.getInput('expiryMins'),
        postUrl: core.getInput('getUrl'),
        payload: '{ "test": 555 }',
        createdAt: new Date().toISOString()
      })
    })

    core.setOutput('time', new Date().toTimeString());
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
