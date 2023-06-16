export class Services {
  getProducts = async () => {
    try {
      const res = await axios({
        url: 'https://648c1fd48620b8bae7ec4755.mockapi.io/Product',
        method: 'GET',
      });
      return res.data;
    } catch (err) {
      console.warn(err);
    }
  };

  getProductById = async (id) => {
    try {
      const res = await axios({
        url: `https://648c1fd48620b8bae7ec4755.mockapi.io/Product/${id}`,
        method: 'GET',
      });
      return res.data;
    } catch (err) {
      console.warn(err);
    }
  };

  addProduct = async (product) => {
    try {
      await axios({
        url: 'https://648c1fd48620b8bae7ec4755.mockapi.io/Product',
        method: 'POST',
        data: product,
      });
    } catch (err) {
      console.warn(err);
    }
  };

  updateProduct = async (product) => {
    try {
      await axios({
        url: `https://648c1fd48620b8bae7ec4755.mockapi.io/Product/${product.id}`,
        method: 'PUT',
        data: product,
      });
    } catch (err) {
      console.warn(err);
    }
  };

  deleteProduct = async (id) => {
    try {
      await axios({
        url: `https://648c1fd48620b8bae7ec4755.mockapi.io/Product/${id}`,
        method: 'DELETE',
      });
    } catch (err) {
      console.warn(err);
    }
  };
}
