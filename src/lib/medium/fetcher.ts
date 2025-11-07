// HTTP fetching logic for Medium articles

import axios from "axios";
import { HEADERS } from "./constants";

// Fetches the HTML content from a given URL
export async function fetchArticleHtml(url: string): Promise<string> {
  const response = await axios.get(url, { headers: HEADERS });
  return response.data;
}
