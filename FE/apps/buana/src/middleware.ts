import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

const uuidv4 = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function middleware(request: NextRequest): NextResponse {
  const isDeviceId = request.cookies.has("deviceId");
  const response = NextResponse.next();

  if (!isDeviceId) {
    const uuid = uuidv4();
    response.headers.set(
      "Set-Cookie",
      `deviceId=${uuid}; ${process.env.COOKIE_OPTIONS}`
    );
  }
  return response;
}
