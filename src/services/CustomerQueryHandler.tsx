import api from "./Axios";
import type{ CustomerQuery } from "../types/CustomerQuery";


const CustomerQueryHandler = async (customerQuery: CustomerQuery) => {
    const response = await api.post("/public/customer-query", customerQuery);
    console.log(response.data);
    return response.data;
}

export default CustomerQueryHandler