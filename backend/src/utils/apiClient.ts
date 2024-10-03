import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ENV } from '../config/env';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: 'https://api.balldontlie.io/v1',
            headers: {
                'Authorization': ENV.BALLDONTLIE_API_KEY,
            },
        });

        this.client.interceptors.response.use(
            response => response,
            error => {
                console.error('API request failed:', error.response?.data || error.message);
                return Promise.reject(error);
            }
        );
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.client.get<T>(url, config);
        return response.data;
    }
}

export const apiClient = new ApiClient();
