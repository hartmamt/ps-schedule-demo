#Weekly Schedule Demo

Please note this is a very rough demo and is a work in progress...

This project contains a basic `React` components that can be used to display a weekly class schedule. It also communicates with `black-lion` and handles passing the remote request responses from  using the delivered PeopleSoft REST api.

To run this locally you must first create a file called development.json like this:

```
{
  "getScheduleUrl": "https://servername/PSIGW/RESTListeningConnector/DBNAME/SSR_GET_ENROLLMENT_R.v1/enroll/getEnrollments?languageCd=en",
  "username": "user",
  "password": "password"
}
```
You also must enable the SSR_GET_ENROLLMENT service in Integration Broker as well as set authentication to Basic.

After creating the development.json file run the follow commands:

```
npm init
npm run start
```

Then point your browser to http://localhost:8080

![](https://github.com/hartmamt/ps-schedule-demo/blob/master/image/screen-shot.png)

