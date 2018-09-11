import WeDeploy from 'wedeploy';

const data = WeDeploy.data(process.env.REACT_APP_DATABASE);

const AsyncFetchCollection = async collection => {
  return await data.get(collection);
}

const AsyncUpdateCollection = async (collection, id, toUpdate, value) => {
  let dataObj = {};

  dataObj[toUpdate] = value;

  try {
    return await data
      .update(`${collection}/${id}`, dataObj)
      .then(updated => updated)
      .error(error => console.error(error));
  } catch (error) {
    console.error(error);
  }
};

export { AsyncFetchCollection, AsyncUpdateCollection }
