// Data extraction functions for Medium articles

import type { CheerioAPI } from "cheerio";
import {
  MEDIUM_DOMAIN,
  MEDIUM_URL_PREFIX,
  DEFAULT_TITLE,
  DEFAULT_AUTHOR,
} from "./constants";
import type { AuthorInfo } from "./types";

// Validates if the provided URL is from medium.com
export function validateMediumUrl(url: string): boolean {
  try {
    const hostname = new URL(url).hostname;
    return hostname === MEDIUM_DOMAIN;
  } catch {
    return false;
  }
}

// Extracts the article title from the DOM
export function extractTitle($: CheerioAPI): string {
  return $("article h1").first().text().trim() || DEFAULT_TITLE;
}

// Extracts author information (name and profile link)
export function extractAuthorInfo($: CheerioAPI): AuthorInfo {
  const authorElement = $("[data-testid='authorName']").first();
  const name = authorElement.text().trim() || DEFAULT_AUTHOR;

  let profileLink = authorElement.attr("href") || "";
  if (profileLink.startsWith("/")) {
    profileLink = `${MEDIUM_URL_PREFIX}${profileLink}`;
  }

  return { name, profileLink };
}
