import {HttpService} from "./httpService";
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";


export class AxiosService extends HttpService<AxiosRequestConfig, AxiosResponse> {
  private readonly instance: AxiosInstance;

  headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  constructor(baseUrl: string, headers?: Record<string, string>) {
    super();
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: headers ?? this.headers,
    });
  }

  async delete<AxiosResponse>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.instance.delete(url, config);
  }

  async get<AxiosResponse>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.instance.get(url, config);
  }

  async post<AxiosResponse>(url: string, payload: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.instance.post(url, payload, config);
  }

  async put<AxiosResponse>(url: string, payload: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.instance.put(url, payload, config);
  }
}
