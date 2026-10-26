import packageJson from "../../../../package.json";

/** Answers per request, so a monitor sees the live deployment, not a cached page. */
export const dynamic = "force-dynamic";

/**
 * Liveness check for uptime monitors and the Docker healthcheck.
 * Reports the app version and, on Vercel, the deployed commit.
 */
export function GET() {
  return Response.json(
    {
      status: "ok",
      version: packageJson.version,
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
      time: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
