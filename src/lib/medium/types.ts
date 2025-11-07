// Type definitions for Medium conversion

export type ConversionResult =
  | { error: false; markdown: string; title: string }
  | { error: true; markdown: string };

export interface AuthorInfo {
  name: string;
  profileLink: string;
}
