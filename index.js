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

    const projectId = core.getInput('projectId');
    const expiryMins = core.getInput('expiryMins');
    const url = core.getInput('url');
    const headers = core.getInput('headers') || '';
    const payload = core.getInput('payload') || '';
    const method = core.getInput('method') || 'GET';
    
    const apiBody = JSON.stringify({
      expiryMins,
      method,
      url,
      headers,
      payload: method !== 'GET' ? payload : '',
      createdAt: new Date().toISOString()
    })
    const res = await fetch('https://clean-up-action-v1.gha.workers.dev/?projectId=' + projectId, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: apiBody
    })
    const resJson = await res.json();
    console.log('Scheduler payload', apiBody);
    console.log('Scheduler result', resJson);
    console.log(`Added. After ${expiryMins} mins, trigger this URL: ${method} ${url} ${payload}`);

    core.setOutput('time', new Date().toTimeString());
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
