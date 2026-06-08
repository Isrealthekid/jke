import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const BASE_DIR = path.join(process.cwd(), "data");

const MIME_MAP: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;

  // Resolve path and prevent path traversal
  const filePath = path.resolve(BASE_DIR, ...slug);
  const normalizedBase = BASE_DIR.endsWith(path.sep)
    ? BASE_DIR
    : BASE_DIR + path.sep;

  if (!filePath.startsWith(normalizedBase)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_MAP[ext];

  if (!contentType) {
    return new NextResponse("Unsupported file type", { status: 415 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
