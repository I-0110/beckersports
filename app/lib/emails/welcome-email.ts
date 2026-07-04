export function welcomeEmailHtml({
  name,
  categories,
}: {
  name: string;
  categories: string[];
}) {
  const categoryList =
    categories.length > 0
      ? categories.join(", ")
      : "all topics";

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
                  <td style="background:#dc2626;padding:32px 40px;text-align:center;">
                    <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:700;color:#fbbf24;letter-spacing:0.05em;">
                      BECKER SPORTS
                    </h1>
                    <p style="margin:8px 0 0;font-family:Georgia,serif;font-size:14px;color:#fef2f2;">
                      Emphasis on the draft, the Chiefs, historic accomplishments, and whatever else Alex finds interesting.
                    </p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px;">
                    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;color:#1a1a1a;">
                      You're in, ${name}! 🏈
                    </h2>
                    <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:16px;color:#444;line-height:1.6;">
                      Welcome to Becker Sports. You'll now get the latest coverage delivered straight to your inbox.
                    </p>
                    <p style="margin:0 0 24px;font-family:Georgia,serif;font-size:16px;color:#444;line-height:1.6;">
                      You signed up for: <strong style="color:#dc2626;">${categoryList}</strong>
                    </p>

                    <!-- Divider -->
                    <hr style="border:none;border-top:1px solid #e0e0dc;margin:24px 0;" />

                    <p style="margin:0;font-family:Georgia,serif;font-size:14px;color:#888;line-height:1.6;">
                      If you didn't sign up for this, you can safely ignore this email. 
                      You won't receive any further emails unless you sign up at beckersports.com.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#1a1a1a;padding:24px 40px;text-align:center;">
                    <p style="margin:0;font-family:Georgia,serif;font-size:12px;color:#888;">
                      © ${new Date().getFullYear()} Becker Sports · 
                      <a href="https://beckersports.com" style="color:#fbbf24;text-decoration:none;">beckersports.com</a>
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