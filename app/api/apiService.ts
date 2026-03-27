import { getApiDomain } from "@/utils/domain";
import { ApplicationError } from "@/types/error";

export class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = getApiDomain();
  }

  private getHeaders(includeJsonContentType: boolean = true): HeadersInit {
    const headers: HeadersInit = {};

    if (includeJsonContentType) {
      headers["Content-Type"] = "application/json";
    }

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return headers;
  }


  /**
   * Helper function to check the response, parse JSON,
   * and throw an error if the response is not OK.
   *
   * @param res - The response from fetch.
   * @param errorMessage - A descriptive error message for this call.
   * @returns Parsed JSON data.
   * @throws ApplicationError if res.ok is false.
   */

  private async processResponse<T>(response: Response, errorMessage: string): Promise<T> {
    if (!response.ok) {
      let errorDetail = response.statusText;

      try {
        const errorData = await response.json();
        if (errorData?.reason) {
          errorDetail = errorData.reason;
        } else if (errorData?.message) {
          errorDetail = errorData.message;
        } else {
          errorDetail = JSON.stringify(errorData);
        }
      } catch { //this ignordes any json parse errors
      }
      const error = new Error(
        `${errorMessage} (${response.status}: ${errorDetail})`
      ) as ApplicationError;

      error.status = response.status;
      error.info = JSON.stringify(
        {
          status: response.status,
          statusText: response.statusText,
        },
        null,
        2
      );

      throw error;
    }
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return response.json() as Promise<T>;
    }
    return undefined as T;
  }

  /**
   * GET request.
   * @param endpoint - The API endpoint (e.g. "/users").
   * @returns JSON data of type T.
   */
  public async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(),
    });

    return this.processResponse<T>(response, "Failed to fetch data");
  }

  /**
   * POST request.
   * @param endpoint - The API endpoint (e.g. "/users").
   * @param data - The payload to post.
   * @returns JSON data of type T.
   */
  public async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });

    return this.processResponse<T>(response, "Failed to post data");
  }

  /**
   * PUT request.
   * @param endpoint - The API endpoint (e.g. "/users/123").
   * @param data - The payload to update.
   * @returns JSON data of type T.
   */
  public async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });

    return this.processResponse<T>(response, "Failed to update data");
  }

  /**
   * DELETE request.
   * @param endpoint - The API endpoint (e.g. "/users/123").
   * @returns JSON data of type T.
   */

  public async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return this.processResponse<T>(response, "Failed to delete data");
  }
}

