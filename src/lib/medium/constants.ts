// Constants and configuration for Medium conversion

export const MEDIUM_DOMAIN = "medium.com";
export const MEDIUM_URL_PREFIX = "https://medium.com";

export const DEFAULT_TITLE = "Untitled Article";
export const DEFAULT_AUTHOR = "Unknown Author";

export const ERROR_NO_ARTICLE = "Error: No article found on the page.";
export const ERROR_INVALID_URL = "# Invalid URL: Please use a medium.com URL.";
export const INVALID_URL_VIDEO_ID = "xvFZjo5PgG0";

export const UNDESIRED_LINES = new Set([
  "·",
  "Published in",
  "--",
  "1",
  "Listen",
  "Share",
]);

export const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  Referer: "https://medium.com/",
};

export const LINES_TO_CHECK_FOR_REMOVAL = 40;
