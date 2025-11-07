// Main orchestration for converting Medium articles to Markdown

import * as cheerio from "cheerio";
import { turndownService } from "./turndown";
import { fetchArticleHtml } from "./fetcher";
import {
  validateMediumUrl,
  extractTitle,
  extractAuthorInfo,
} from "./extractors";
import {
  removeMediumUiElements,
  removeEmptyElements,
  restructureArticle,
  cleanMarkdown,
  filterUndesiredLines,
} from "./cleaners";
import {
  ERROR_INVALID_URL,
  ERROR_NO_ARTICLE,
  INVALID_URL_VIDEO_ID,
} from "./constants";
import { getYouTubeEmbed } from "./video";
import type { ConversionResult } from "./types";

// Converts a Medium article to Markdown format
export async function convertToMD(url: string): Promise<ConversionResult> {
  try {
    // Validate URL
    if (!validateMediumUrl(url)) {
      return {
        error: true,
        markdown: `${ERROR_INVALID_URL}\n\n${getYouTubeEmbed(INVALID_URL_VIDEO_ID)}`,
      };
    }

    // Fetch and parse HTML
    const html = await fetchArticleHtml(url);
    const $ = cheerio.load(html);

    // Verify article exists
    const articleHtml = $("article").html();
    if (!articleHtml) {
      return { error: true, markdown: ERROR_NO_ARTICLE };
    }

    // Extract metadata
    const title = extractTitle($);
    const author = extractAuthorInfo($);

    // Clean and restructure HTML
    removeMediumUiElements($);
    removeEmptyElements($);
    restructureArticle($, url, author);

    // Convert HTML to Markdown
    const rawMarkdown = turndownService.turndown($("article").html() || "");

    // Clean and filter Markdown
    let markdown = cleanMarkdown(rawMarkdown);
    markdown = filterUndesiredLines(markdown);

    return { error: false, markdown, title };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Error fetching the article";
    return { error: true, markdown: errorMessage };
  }
}