export class Service {
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
}
