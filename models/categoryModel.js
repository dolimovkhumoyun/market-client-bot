const axios = require("axios");

module.exports = {
  async getAll() {
    return axios
      .get("http://localhost:2020/product/categories")
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  },
};
