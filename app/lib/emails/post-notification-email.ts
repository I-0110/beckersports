import { generateUnsubscribeToken } from "@/app/lib/emails/unsubscribe-token";

export function postNotificationEmailHtml({
  subscriberName,
  subscriberEmail,
  postTitle,
  postExcerpt,
  postSlug,
  categoryName, 
}: {
  subscriberName: string;
  subscriberEmail: string;
  postTitle: string;
  postExcerpt: string | null;
  postSlug: string;
  categoryName: string | null;
  categoryColor: string;
}) {
  const token = generateUnsubscribeToken(subscriberEmail);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://beckersports.com";
  const postUrl = `${baseUrl}/posts/${postSlug}`;
  const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(subscriberEmail)}&token=${token}`;
  const preferencesUrl = `${baseUrl}/preferences?email=${encodeURIComponent(subscriberEmail)}&token=${token}`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0;padding:0;background:#f5f5f3;font-family:Georgia,serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f3;padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">

                <!-- Header -->
                <tr>
                  <td style="background:#dc2626;padding:24px 40px;text-align:center;">
                    <h1 style="margin:0;font-family:Georgia,serif;font-size:24px;font-weight:700;color:#fbbf24;letter-spacing:0.05em;">
                      BECKER SPORTS
                    </h1>
                  </td>
                </tr>

                <!-- Category badge -->
                ${categoryName ? `
                <tr>
                  <td style="padding:24px 40px 0;">
                    <span style="display:inline-block;background:#fef2f2;color:#dc2626;font-family:Georgia,serif;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;text-transform:uppercase;letter-spacing:0.05em;">
                      ${categoryName}
                    </span>
                  </td>
                </tr>
                ` : ""}

                <!-- Body -->
                <tr>
                  <td style="padding:16px 40px 40px;">
                    <h2 style="margin:0 0 12px;font-family:Georgia,serif;font-size:24px;color:#1a1a1a;line-height:1.3;">
                      ${postTitle}
                    </h2>
                    ${postExcerpt ? `
                    <p style="margin:0 0 24px;font-family:Georgia,serif;font-size:16px;color:#444;line-height:1.6;">
                      ${postExcerpt}
                    </p>
                    ` : ""}

                    <!-- CTA button -->
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background:#dc2626;border-radius:8px;padding:12px 24px;">
                          <a href="${postUrl}" style="font-family:Georgia,serif;font-size:16px;font-weight:700;color:#fbbf24;text-decoration:none;">
                            Read the full post →
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#1a1a1a;padding:24px 40px;text-align:center;">
                    <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:12px;color:#888;">
                      © ${new Date().getFullYear()} Becker Sports ·
                      <a href="${baseUrl}" style="color:#fbbf24;text-decoration:none;">beckersports.com</a>
                    </p>
                    <p style="margin:0;font-family:Georgia,serif;font-size:11px;color:#666;">
                      Hi ${subscriberName} —
                      <a href="${preferencesUrl}" style="color:#fbbf24;text-decoration:underline;">Manage preferences</a>
                      &nbsp;·&nbsp;
                      <a href="${unsubscribeUrl}" style="color:#fbbf24;text-decoration:underline;">Unsubscribe</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}