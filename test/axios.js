////////////////////////////

const axios = require("axios");

axios
  .get(
    "https://data.mongodb-api.com/app/data-vxqgx/endpoint/data/v1/action/findOne",
    {
      params: {},
      headers: {},
    }
  )
  .then((response) => console.log(response))
  .catch((e) => console.error(e))
  .finally(() => console.log("END"));

axios
  .post(
    "https://data.mongodb-api.com/app/data-vxqgx/endpoint/data/v1/action/findOne",
    { products: "Cerveza" },
    {
      params: { name: "Quilmes" },
      headers: { key: "521" },
    }
  )
  .then((response) => console.log(response))
  .catch((e) => console.error(e))
  .finally(() => console.log("END"));
