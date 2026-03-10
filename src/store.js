export const initialStore = () => {
  return {
    contacts: []
  };
};

const storeReducer = (store, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...store, contacts: action.payload };
    default:
      return store;
  }
};

export default storeReducer;