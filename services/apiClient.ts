const BASE_URL = "http://13.125.198.130";

interface RequestOptions extends RequestInit {
	headers?: HeadersInit;
	body?: any;
	responseType?: "json" | "blob" | "text";
}

class ApiClient {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	private async request<T>(
		method: string,
		url: string,
		options: RequestOptions = {}
	): Promise<T> {
		const {headers, body, responseType = "json", ...rest} = options;

		// Ensure headers is a Record<string, string>
		const headersObj: Record<string, string> = {
			"Content-Type": "application/json",
			...(headers as Record<string, string>),
		};

		const config: RequestInit = {
			method,
			headers: headersObj,
			...rest,
		};

		if (body) {
			if (body instanceof FormData) {
				config.body = body;
				// Remove 'Content-Type' header
				delete headersObj["Content-Type"];
			} else if (typeof body === "object") {
				config.body = JSON.stringify(body);
			} else {
				config.body = body;
			}
		}

		// Log request details
		console.log(`[ApiClient] ${method} request to: ${this.baseURL}${url}`);

		try {
			const response = await fetch(`${this.baseURL}${url}`, config);
			if (response.status === 204) {
				return {} as T;
			}

			// Log response details
			console.log(`[ApiClient] Response status (${url}):`, response.status);

			const contentType = response.headers.get("content-type");

			let data: T;
			switch (responseType) {
				case "blob":
					data = (await response.blob()) as unknown as T;
					break;
				case "text":
					data = (await response.text()) as unknown as T;
					break;
				case "json":
				default:
					if (contentType?.includes("application/json")) {
						data = await response.json();
					} else {
						data = (await response.text()) as unknown as T;
					}
					break;
			}

			if (!response.ok) {
				return Promise.reject({status: response.status, data});
			}

			return data;
		} catch (error) {
			// Log error
			console.error("[ApiClient] Request failed:", error);
			return Promise.reject(error);
		}
	}

	get<T>(url: string, options?: RequestOptions): Promise<T> {
		return this.request<T>("GET", url, options);
	}

	post<T>(url: string, body: any, options: RequestOptions = {}): Promise<T> {
		return this.request<T>("POST", url, {...options, body});
	}

	put<T>(url: string, body: any, options: RequestOptions = {}): Promise<T> {
		return this.request<T>("PUT", url, {...options, body});
	}

	delete<T>(url: string, options?: RequestOptions): Promise<T> {
		return this.request<T>("DELETE", url, options);
	}

	patch<T>(url: string, body: any, options: RequestOptions = {}): Promise<T> {
		return this.request<T>("PATCH", url, {...options, body});
	}
}

const apiClient = new ApiClient(BASE_URL);

export default apiClient;
