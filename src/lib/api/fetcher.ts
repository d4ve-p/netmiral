import constants from "@/lib/constants";

class ApiError extends Error {
    constructor(message: string, public status: number) {
        super(message);
        this.name = 'ApiError';
    }
}

async function http<T>(path: string, config: RequestInit): Promise<T> {
    const mergedConfig: RequestInit = {
        ...config,
        credentials: 'include'
    }

    const request = new Request(`${constants.BACKEND_URL}${path}`, mergedConfig);
    const response = await fetch(request);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `API error: ${response.status}`;
        throw new ApiError(errorMessage, response.status);
    }
    return response.json();
}

export const fetcher = {
    /**
   * Makes a GET request.
   * @param path The URL path to request.
   * @param config Optional fetch configuration.
   * @returns A promise that resolves with the parsed JSON response.
   */
    get: <T>(path: string, config?: RequestInit): Promise<T> => {
        const init = { method: 'GET', ...config };
        return http<T>(path, init);
    },

      /**
   * Makes a POST request.
   * @param path The URL path to request.
   * @param body The request body, which will be serialized to JSON.
   * @param config Optional fetch configuration.
   * @returns A promise that resolves with the parsed JSON response.
   */
    post: <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
        const init = { method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}, ...config };
        return http<U>(path, init);
    },

    /**
     * Makes a PUT request.
     * @param path The URL path to request.
     * @param body The request body, which will be serialized to JSON.
     * @param config Optional fetch configuration.
     * @returns A promise that resolves with the parsed JSON response.
   */
    put: <T, U>(path: string, body: T, config?: RequestInit): Promise<U> => {
        const init = { method: 'PUT', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}, ...config };
        return http<U>(path, init);
    },

    /**
     * Makes a DELETE request.
     * @param path The URL path to request.
     * @param config Optional fetch configuration.
     * @returns A promise that resolves with the parsed JSON response.
    */
    delete: <T>(path: string, config?: RequestInit): Promise<T> => {
        const init = { method: 'DELETE', ...config };
        return http<T>(path, init);
    }
}

export function createMutationFetcher<TArg, TResult>(
    apiFunction: (arg: TArg) => Promise<TResult>
) : (key: string, { arg }: { arg: TArg }) => Promise<TResult> {
    return (key , { arg }) => {
        return apiFunction(arg);
    }
}
