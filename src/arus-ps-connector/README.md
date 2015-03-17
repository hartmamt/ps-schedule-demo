# arus-ps-connector
A Connector designed for use with PeopleSoft

## Installation

`npm i arus-ps-connector`

## API

### `PSConnector#getProfile(requestParams : Object) : Promise of Profile`

Takes an object defining the request parameters and returns a `Promise` of a `Profile` object.

### `PSConnector#getPicture(requestParams : Object) : Promise of Picture`

Takes an object defining the request parameters and returns a `Promise` of a `Picture` object.

### `PSConnector#getSchedule(requestParams : Object) : Promise of Schedule`

An example `requestParams` object for the previous methods might look like:
```js
var requestParams = {
  url: 'someRequestUrl',
  auth: ['username', 'password'],
  acceptType: 'application/json',
  headers: {
    someHeader: 'someValue',
    someOtherHeader: 'someOtherValue'
  }
}
```
