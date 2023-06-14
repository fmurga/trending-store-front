

export const getItemById = (id, products) => {
   const item = products.find(element => element._id === id);
   return item;
}