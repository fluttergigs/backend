

export abstract class HttpService<C, T> {
    protected abstract get<T>(url: string, config?: C): Promise<T>;
    protected abstract post<T>(url: string, data?: any, config?: C): Promise<T>;
    protected abstract put<T>(url: string, data?: any, config?: C): Promise<T>;
    protected abstract delete<T>(url: string, config?: C): Promise<T>;
}
