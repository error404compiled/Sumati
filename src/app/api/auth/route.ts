import { NextRequest, NextResponse } from "next/server";

// GitHub OAuth — step 1: send the editor to GitHub to authorize.
// Decap CMS opens this endpoint in a popup. We redirect to GitHub's
// authorize URL, then GitHub sends the user back to /api/callback.
//
// Required Vercel environment variables:
//   OAUTH_GITHUB_CLIENT_ID      (from your GitHub OAuth App)
//   OAUTH_GITHUB_CLIENT_SECRET  (from your GitHub OAuth App)

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;

  if (!clientId) {
    return new NextResponse(
      "OAuth is not configured. Add OAUTH_GITHUB_CLIENT_ID and OAUTH_GITHUB_CLIENT_SECRET in Vercel → Settings → Environment Variables.",
      { status: 500, headers: { "Content-Type": "text/plain" } },
    );
  }

  const origin = new URL(req.url).origin;
  const redirectUri = `${origin}/api/callback`;
  const state = crypto.randomUUID();

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user");
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl.toString());
  // Store the state so the callback can verify it (CSRF protection).
  response.cookies.set("decap_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return response;
}
