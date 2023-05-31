const DEFAULT_STATE = {
    productData: null,
  
  };
  
  const dataReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case 'PRODUCT_DATA':
        return {
          ...state,
          productData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default dataReducer;
  