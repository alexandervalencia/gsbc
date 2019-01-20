export const updateObjectInArrayById = (array, objToUpdate) => {
  return array.map(obj => {
    if (obj.id !== objToUpdate.id) {
      // This isn't the item we care about - keep it as-is
      return obj;
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...objToUpdate,
    };
  });
};
