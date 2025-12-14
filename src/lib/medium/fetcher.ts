// HTTP fetching logic for Medium articles

import axios, { AxiosError } from "axios";
import { HEADERS } from "./constants";

// Sleep utility for retry delays
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetches the HTML content from a given URL with retry logic
export async function fetchArticleHtml(
  url: string,
  maxRetries: number = 3
): Promise<string> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios.get(url, {
        headers: HEADERS,
        timeout: 30000, 
        validateStatus: (status) => status < 500, 
      });

      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = parseInt(
          response.headers["retry-after"] || "60",
          10
        );
        const delay = Math.min(retryAfter * 1000, 60000); 

        if (attempt < maxRetries - 1) {
          console.log(
            `Rate limited. Waiting ${delay / 1000}s before retry ${attempt + 1}/${maxRetries}...`
          );
          await sleep(delay);
          continue;
        }

        throw new Error(
          `Medium is rate limiting requests. Please try again in ${retryAfter} seconds.`
        );
      }

      // Handle other client errors
      if (response.status >= 400 && response.status < 500) {
        throw new Error(
          `Failed to fetch article: ${response.status} ${response.statusText}`
        );
      }

      return response.data;
    } catch (error) {
      lastError = error as Error;

      // Log the error details
      if (axios.isAxiosError(error)) {
        console.error(`Fetch attempt ${attempt + 1} failed:`, {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data?.substring(0, 200), // first 200 chars
          message: error.message,
        });
      } else {
        console.error(`Fetch attempt ${attempt + 1} failed:`, error);
      }

      // Don't retry on client errors (4xx)
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (
          axiosError.response &&
          axiosError.response.status >= 400 &&
          axiosError.response.status < 500 &&
          axiosError.response.status !== 429
        ) {
          throw error;
        }
      }

      // Exponential backoff for retries
      if (attempt < maxRetries - 1) {
        const delay = Math.min(2000 * Math.pow(2, attempt), 30000); // Max 30 seconds
        console.log(
          `Fetch failed. Retrying in ${delay / 1000}s (${attempt + 1}/${maxRetries})...`
        );
        await sleep(delay);
      }
    }
  }

  throw lastError || new Error("Failed to fetch article after retries");
}
