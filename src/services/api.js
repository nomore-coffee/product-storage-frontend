import axios from "axios";

const urluser='http://localhost:3001/product';

export const getProductApi = async()=>{
    return await axios.get(`${urluser}/getProduct`)
}
export const saveProductApi = async(productObject)=>{
    return await axios.post(`${urluser}/saveProduct`,productObject)
}