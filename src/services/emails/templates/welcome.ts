export type WelcomeTemplateData = {
  [key: string]: any;
}

const getWelcomeEmailTemplate = (data?: WelcomeTemplateData) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to FlutterGigs!</title>
  <style>
  body {
    font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
    background-color: #f4f6f8;
    margin: 0;
    padding: 0;
  }
.container {
    max-width: 600px;
    background-color: #ffffff;
    margin: 40px auto;
    padding: 40px 30px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }
  h1 {
    color: #3c3f52;
    margin-bottom: 10px;
  }
  p {
    color: #555;
    font-size: 1rem;
    line-height: 1.6;
  }
.cta {
    margin-top: 30px;
    text-align: center;
  }
.cta-button {
    background-color: #615fff;
    color: #ffffff;
    padding: 14px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    font-size: 1rem;
  }
.features {
    margin-top: 30px;
    padding-left: 20px;
    color: #333;
  }
.features li {
    margin-bottom: 10px;
  }
.footer {
    margin-top: 50px;
    text-align: center;
    font-size: 0.85rem;
    color: #888;
  }
.footer a {
    color: #615fff;
    text-decoration: none;
  }
  </style>
  </head>
  <body>
  <div class="container">
    <h1>👋 Welcome to FlutterGigs!</h1>

  <p>
  We're thrilled to have you join the first job platform
  <strong>dedicated entirely to Flutter developers</strong>. Whether
  you're looking for your next opportunity or just exploring, you're in
  the right place.
  </p>

  <p>Here’s what you can do now:</p>
  <ul class="features">
    <li>🧑‍💻 Complete your profile (add your education & experience)</li>
  <li>
          🚀 Get matched with job opportunities — first come, first served
  </li>
  <li>
          🧠 Use our real-time AI Interview Simulator to prep with confidence
  </li>
  <li>💡 Share & explore Flutter code snippets in the Learn section</li>
  </ul>

  <div class="cta">
  <a href="https://fluttergigs.com/account/user" class="cta-button"
    >🚀 Complete My Profile</a
  >
  </div>

  <p style="margin-top: 30px;">
    Have questions or ideas? Just reply — we read everything!
  </p>

  <div class="footer">
        💙 Follow us on
  <a href="https://x.com/fluttergigs" target="_blank">Twitter/X</a> for
  the latest updates.<br />
        © {{current_year}} FlutterGigs. All rights reserved.
  </div>
  </div>
  </body>
  </html>
  `.replace("{{current_year}}", new Date().getFullYear().toString());

};

export default getWelcomeEmailTemplate;
