
<p align="center">
  <a href="https://github.com/ngduc/clean-up-action/actions"><img alt="javscript-action status" src="https://github.com/ngduc/clean-up-action/workflows/units-test/badge.svg"></a>
</p>

# ngduc/clean-up-action

Use this Github Action to clean up resources after X minutes by calling a URL (GET/POST)

### Use cases
- After deploying to a demo environment, 1 day later, we want it to clean up itself by triggering an API endpoint to remove that demo environment.
- After running some step, we want to trigger an endpoint to notify somebody, etc.