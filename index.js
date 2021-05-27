const AxiosEasyfier = require("./axios-easyfier");
const helper = new AxiosEasyfier();

const main = async () => {
  try {
    const response = await helper
      .withUrl("https://jsonplaceholder.typicode.com/todos/1")
      .GET();

    console.info(response);
  } catch (error) {
    console.error(error.message);
  }
};

main();
