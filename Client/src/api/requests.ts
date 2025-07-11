import axios, { AxiosError, type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../store/store";

axios.defaults.baseURL = "http://localhost:5173/api/";
axios.defaults.withCredentials = true;

axios.interceptors.request.use((requests) => {
    const token = store.getState().account.user?.token;
    if (token) {
        requests.headers.Authorization = `Bearer ${token}`;
    }
    return requests;
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        const { data, status } = error.response as AxiosResponse;
        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        modelStateErrors.push(data.errors[key]);
                    }

                    throw modelStateErrors;
                }
                toast.error(data.title);
                break;
            case 401:
                toast.error(data.title);
                break;
            case 404:
                router.navigate("/not-found", {
                    state: { error: data, status: status },
                });
                break;
            case 500:
                router.navigate("/server-error", {
                    state: { error: data, status: status },
                });
                break;
            default:
                break;
        }
        return Promise.reject(error.response);
    }
);

const queries = {
    get: (url: string) =>
        axios.get(url).then((response: AxiosResponse) => response.data),
    post: (url: string, body: {}) =>
        axios.post(url, body).then((response: AxiosResponse) => response.data),
    put: (url: string, body: {}) =>
        axios.get(url, body).then((response: AxiosResponse) => response.data),
    delete: (url: string) =>
        axios.delete(url).then((response: AxiosResponse) => response.data),
};

const Errors = {
    get400Error: () => queries.get("/error/bad-request"),
    get401Error: () => queries.get("/error/unauthorized"),
    get404Error: () => queries.get("/error/not-found"),
    get500Error: () => queries.get("/error/server-error"),
    getValidationError: () => queries.get("/error/validation-error"),
};

const Catalog = {
    list: () => queries.get("products"),
    details: (id: number) => queries.get(`products/${id}`),
};

const Cart = {
    get: () => queries.get("cart"),
    addItem: (productId: number, quantity = 1) =>
        queries.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
    deleteItem: (productId: number, quantity = 1) =>
        queries.delete(`cart?productId=${productId}&quantity=${quantity}`),
};

const Account = {
    login: (formData: any) => queries.post("account/login", formData),
    register: (formData: any) => queries.post("account/register", formData),
    getUser: () => queries.get("account/getuser"),
};

const requests = {
    Catalog,
    Errors,
    Cart,
    Account,
};

export default requests;
