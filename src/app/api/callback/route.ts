import { NextRequest, NextResponse } from "next/server";

// GitHub OAuth — step 2: GitHub redirects back here with a code.
// We exchange the code for an access token, then hand the token to the
// Decap CMS window using the postMessage handshake it expects.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function resultPage(status: "success" | "error", content: unknown) {
  const payload = JSON.stringify(content);
  const message = `authorization:github:${status}:${payload}`;
  // The handshake: the popup announces "authorizing:github", the CMS window
  // replies, and then we post the token (or error) back to the opener.
  return new NextResponse(
    `<!doctype html>
<html>
  <head><meta charset="utf-8" /><title>Authorizing…</title></head>
  <body>
    <p>Completing sign-in… you can close this window if it does not close automatically.</p>
    <script>
      (function () {
        function receiveMessage(event) {
          window.opener.postMessage(${JSON.stringify(message)}, event.origin);
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  </body>
</html>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = req.cookies.get("decap_oauth_state")?.value;

  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return resultPage("error", {
      message:
        "OAuth is not configured. Add OAUTH_GITHUB_CLIENT_ID and OAUTH_GITHUB_CLIENT_SECRET in Vercel.",
    });
  }

  if (!code) {
    return resultPage("error", { message: "Missing authorization code." });
  }

  if (!state || state !== cookieState) {
    return resultPage("error", {
      message: "Invalid OAuth state. Please try signing in again.",
    });
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${url.origin}/api/callback`,
      }),
    },
  );

  const data = (await tokenResponse.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!tokenResponse.ok || data.error || !data.access_token) {
    return resultPage("error", {
      message:
        data.error_description || data.error || "Failed to obtain access token.",
    });
  }

  return resultPage("success", {
    token: data.access_token,
    provider: "github",
  });
}
