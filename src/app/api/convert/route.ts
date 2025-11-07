import { NextResponse } from "next/server";
import { convertToMD } from "@/lib/medium/convert";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: true, markdown: "No URL provided." },
      { status: 400 }
    );
  }

  try {
    const result = await convertToMD(url);

    if ("error" in result && result.error) {
      // rate limit error
      const isRateLimit = result.markdown.toLowerCase().includes("rate limit");
      const status = isRateLimit ? 429 : 500;

      return NextResponse.json(
        { error: true, markdown: result.markdown },
        { status }
      );
    } else {
      // result is { error: false, markdown: string, title: string }
      return NextResponse.json({
        error: false,
        markdown: result.markdown,
        title: result.title,
      });
    }
  } catch (error) {
    console.error("Unexpected error in convert route:", error);
    return NextResponse.json(
      {
        error: true,
        markdown: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}