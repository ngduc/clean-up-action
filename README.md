
<p align="center">
  <a href="https://github.com/ngduc/clean-up-action/actions"><img alt="javscript-action status" src="https://github.com/ngduc/clean-up-action/workflows/units-test/badge.svg"></a>
</p>

# ngduc/clean-up-action

Use this Github Action to clean up resources after X minutes by calling a URL (GET/POST)

### Use cases
- After deploying to a demo environment, 1 day later, we want it to clean up itself by triggering an API endpoint to remove that demo environment.
- After running some step, we want to trigger an endpoint to notify somebody, etc.

### Usage

Add to your Yaml file:

```yml
jobs:
  clean:
    runs-on: ubuntu-latest
    steps:
      - name: cleanup
        uses: ngduc/clean-up-action@master
        with:
          projectId: setYourProjectId # set your unique projectId, example: myProjectId1
          expiryMins: 1440 # after X minutes, invoke the below URL endpoint.
          method: 'POST' # one of these methods: GET, POST, PUT, PATCH, DELETE
          url: https://some.cleanup.api.endpoint # some URL endpoint to clean up resources.
          headers: '' # headers (JSON string).
          payload: '{ "someResourceId": 1234 }' # payload for url (JSON string).
```

### Links

- Marketplace link: [marketplace/actions/clean-up-resources](https://github.com/marketplace/actions/clean-up-resources)
- Article: [Github Action - Clean up resources](https://dev.to/ngduc/github-action-clean-up-resources-i70)
- Usage example: [parcelui](https://github.com/ngduc/parcelui/blob/master/.github/workflows/ci.yml#L26-L34)