import { NextRequest, NextResponse } from "next/server";

// Simple static-credentials login for the /sanjuoliveteddy content manager.
//
// The editor signs in with a username + password (no GitHub OAuth App needed).
// When the credentials are correct, we hand the CMS a GitHub token so it can
// save posts to the repository. The token is the ONLY secret you must set in
// Vercel — it must never be hard-coded into the public repo.
//
//   Vercel → Settings → Environment Variables:
//     GITHUB_TOKEN   = a GitHub Personal Access Token with "repo" access
//
// Optional (to change the login from the defaults below):
//     CMS_USERNAME   = Sumati
//     CMS_PASSWORD   = Sanjana@900

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const USERNAME = process.env.CMS_USERNAME || "Sumati";
const PASSWORD = process.env.CMS_PASSWORD || "Sanjana@900";

function loginForm(error?: string) {
  return new NextResponse(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign in — Seeds of Wisdom</title>
    <style>
      :root { color-scheme: light; }
      body {
        margin: 0; min-height: 100vh; display: grid; place-items: center;
        font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        background: #faf7f2; color: #2b2b2b;
      }
      form {
        width: min(360px, 90vw); background: #fff; padding: 32px;
        border-radius: 16px; box-shadow: 0 12px 40px rgba(0,0,0,.08);
        display: flex; flex-direction: column; gap: 14px;
      }
      h1 { font-size: 20px; margin: 0 0 4px; text-align: center; }
      p.sub { margin: 0 0 8px; text-align: center; color: #8a8275; font-size: 14px; }
      label { font-size: 13px; font-weight: 600; color: #6b6358; }
      input {
        padding: 11px 13px; border: 1px solid #e4ddd2; border-radius: 10px;
        font-size: 15px; outline: none;
      }
      input:focus { border-color: #c9a96a; }
      button {
        margin-top: 6px; padding: 12px; border: 0; border-radius: 10px;
        background: #c9a96a; color: #fff; font-size: 15px; font-weight: 600;
        cursor: pointer;
      }
      button:hover { background: #b8995a; }
      .error {
        background: #fdecec; color: #b3261e; padding: 10px 12px;
        border-radius: 10px; font-size: 13px; text-align: center;
      }
    </style>
  </head>
  <body>
    <form method="POST" action="/api/auth">
      <h1>Seeds of Wisdom</h1>
      <p class="sub">Content Manager sign-in</p>
      ${error ? `<div class="error">${error}</div>` : ""}
      <label for="username">Username</label>
      <input id="username" name="username" autocomplete="username" autofocus required />
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required />
      <button type="submit">Sign in</button>
    </form>
  </body>
</html>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

function handshakePage(status: "success" | "error", content: unknown) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  return new NextResponse(
    `<!doctype html>
<html>
  <head><meta charset="utf-8" /><title>Signing in…</title></head>
  <body>
    <p style="font-family:system-ui;text-align:center;margin-top:40px;">Signing you in…</p>
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

// GET → show the login form (Decap opens this in a popup window).
export async function GET() {
  return loginForm();
}

// POST → validate the username/password, then return the GitHub token.
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const username = String(form.get("username") || "");
  const password = String(form.get("password") || "");

  if (username !== USERNAME || password !== PASSWORD) {
    return loginForm("Incorrect username or password.");
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return handshakePage("error", {
      message:
        "GITHUB_TOKEN is not set. Add a GitHub Personal Access Token (repo access) in Vercel → Settings → Environment Variables, then redeploy.",
    });
  }

  return handshakePage("success", { token, provider: "github" });
}
