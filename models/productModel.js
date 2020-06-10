const axios = require("axios");

module.exports = {
  async getProducts(id) {
    return axios
      .get(`http://localhost:2020/product/product?c_id=${id}`)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  },
};
