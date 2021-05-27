# AxiosEasyfier

## Objectives

To help developers to create http requests easily with axios using a Object Builder Pattern, and learn basics javascript concepts (i'm from Java world :)).

<h2></h2>
&nbsp;

## How to use

To create a simple GET http request:

```javascript
const AxiosEasyfier = require("./axios-easyfier"); // import AxiosEasyfier
const easyfier = new AxiosEasyfier(); // create a AxiosEasyfier istance

//... omitted code

const response = await easyfier
  .withUrl("https://jsonplaceholder.typicode.com/todos/1")
  .GET();

//... omitted code
```

The response body looks like the follow:

```json
{ "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false }
```

And the complete example of GET request:

```javascript
const AxiosEasyfier = require("./axios-easyfier");
const easyfier = new AxiosEasyfier();

const makeRequest = async () => {
  try {
    const response = await easyfier
      .withUrl("https://jsonplaceholder.typicode.com/todos/1")
      .GET();

    console.info(response);
  } catch (error) {
    console.error(error.message);
  }
};

makeRequest();
```

In the **Promise** way:

```javascript
const AxiosEasyfier = require("./axios-easyfier");
const easyfier = new AxiosEasyfier();

const makeRequest = () => {
  easyfier
    .withUrl("https://jsonplaceholder.typicode.com/todos/1")
    .GET()
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};

makeRequest();
```

<h2></h2>
&nbsp;

## Commom Methods

AxiosEasyfier use Object Build Pattern to create a **request object** with commom attributes to send a http request using [axios](https://www.npmjs.com/package/axios) lib. It's support commom https verbs (**GET**, **POST**, **PUT**, **PATCH** and **DELETE**) and provide build functions to customize the request parameters.

For example, to make a GET request with custom headers:

```javascript
const AxiosEasyfier = require("./axios-easyfier");
const easyfier = new AxiosEasyfier();

const makeRequest = async () => {
  try {
    const response = await easyfier
      .withUrl("https://jsonplaceholder.typicode.com/todos/1")
      .withHeaders({ "X-App-Custom-Header": "Header Value" })
      .GET();

    console.info(response);
  } catch (error) {
    console.error(error.message);
  }
};

makeRequest();
```

To send more than 1 header param, just call withHeaders again with new key -> value object:

```javascript
const response = await easyfier
  .withUrl("https://jsonplaceholder.typicode.com/todos/1")
  .withHeaders({ "X-App-Custom-Header": "Header Value" })
  .withHeaders({ Accept: "*/*" })
  .GET();
```

Or just send an array (with some refactoring...):

```javascript
const headers = [{ "X-App-Custom-Header": "Header Value" }, { Accept: "*/*" }];
const url = "https://jsonplaceholder.typicode.com/todos/1";

const response = await easyfier.withUrl(url).withHeaders(headers).GET();
```

To post data we need to call **.POST()** instead, with additional configuration to send a body in request:

```javascript
const headers = [{ "Content-type": "application/json" }, { Accept: "*/*" }];
const url = "https://jsonplaceholder.typicode.com/todos";
const body = {
  id: 1,
  description: "Some description",
  another: "Another date here",
};

const response = await easyfier
  .withUrl(url)
  .withHeaders(headers)
  .withBody(body)
  .POST();
```

If the server requires a **Basic** ou **Bearer** authentication, add respective easyfier method to do this:

```javascript
// ...omitted code
const secretToken = "SECRETTOKEN1234556SECRETTOKEN1234556";

const response = await easyfier
  .withUrl(url)
  .withHeaders(headers)
  .withBody(body)
  .withBasicAuthorization(secretToken) // Basic
  .POST();

// or with Bearer

const response = await easyfier
  .withUrl(url)
  .withHeaders(headers)
  .withBody(body)
  .withBearerAuthorization(secretToken) // Bearer
  .POST();

// ...omitted code
```

To configure timeout:

```javascript
.withTimeoutInSecs(10) // add timeout param with 10 seconds

.withTimeoutInMils(1000) // add timeout param with 1000 miliseconds
```

To send request with **application/x-www-form-urlencoded** format

```javascript
.withUrlEncondedParams({"param" : "value"})
```

With a list of parameters:

```javascript
// ...omitted code
const params = [{ param1: "value1" }, { param2: "value2" }]

  // ...omitted code
  .withUrlEncondedParams(params);
```

Under the hood, AxiosEasyfier use [qs](https://www.npmjs.com/package/qs) library to configure and parse params.

&nbsp;

## Handle HTTP errors by yourself

By default, axios raise an exception when request not returns success status code (>= **200** and <= **300**). In some cases, it's necessary provide a specific error message or redirect process flow, depending on http status.
To change that behavior, you can configure **withCustomErrorHandling()** with a specific satus code to delegates response handling to your function:

```javascript
const makeRequest = async () => {
  try {
    const url = "https://jsonplaceholder.typicode.com/todos/wrong/1";

    const response = await easyfier
      .withUrl(url)
      .withCustomErrorHandling(404)
      .GET();

    if (response.status === 404) {
      console.info("Nothing to do...");
      return null;
    } else {
      return response.data;
    }

    console.info(response);
  } catch (error) {
    console.error(error.message);
  }
};
```

**IMPORTANT:** When withCustomErrorHandling method has configurated, easyfier returns a complete axios reponse object:

```json
{
  "config": {},
  "data": {},
  "headers": {},
  "status": 404,
  "status": "Not Found"
}
```

Addictionaly, you can configure an array of status to be handled:

```javascript
//... omitted code
const statusToVerify = [400, 404, 405];

//... omitted code
      .withCustomErrorHandling(statusToVerify);
//... omitted code
```

Or, use wihout parameters to handle all request status manually;

```javascript
//... omitted code
      .withCustomErrorHandling();
//... omitted code
```

&nbsp;

> ### REPOSITORY

```https
https://github.com/eviccari/axios-easyfier
```

&nbsp;

> #### ENVOLVED TECHNOLOGIES

- NodeJS 14
- Javascript
- Node Package Management
- Axios
- QS

&nbsp;

> #### MASTER DEPENDENCIES

- Axios
- qs

&nbsp;

> ### ROADMAP

- Form request
- Another complex configurations
