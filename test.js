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
