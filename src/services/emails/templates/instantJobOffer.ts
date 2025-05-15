export type InstantJobOfferEmailTemplateData = {
  username: string;
  jobTitle: string;
  companyName: string;
  location: string;
  jobSlug: string;
  remoteFriendly: string
}


const getInstantJobOfferEmailTemplate = (data: InstantJobOfferEmailTemplateData) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Flutter Job Posted!</title>
  <style>
    body {
      font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 20px;
      color: #333;
    }

    .container {
      background-color: #ffffff;
      padding: 40px 30px;
      max-width: 600px;
      margin: 40px auto;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      text-align: center;
    }

    h1 {
      color: #3c3f52;
      margin-bottom: 20px;
    }

    .job-info {
      font-size: 1.1rem;
      text-align: left;
      margin-top: 20px;
    }

    .job-info li {
      margin: 10px 0;
    }

    .cta-button {
      display: inline-block;
      background-color: #615fff;
      color: white;
      padding: 14px 24px;
      border-radius: 8px;
      font-weight: bold;
      text-decoration: none;
      font-size: 1rem;
      margin-top: 30px;
    }

    .footer {
      margin-top: 50px;
      font-size: 0.85rem;
      color: #888;
    }

    .share-section {
      margin-top: 40px;
      font-size: 0.95rem;
      color: #444;
    }

    .share-section a {
      color: #615fff;
      font-weight: bold;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 New Flutter Job Just Dropped!</h1>

    <p>Hi FlutterGigster,</p>
    <p>We've got a fresh Flutter opportunity you might love:</p>

    <ul class="job-info">
      <li><strong>🧑‍💻 Position:</strong> {{job_title}}</li>
      <li><strong>🏢 Company:</strong> {{company_name}}</li>
      <li><strong>🌍 Location:</strong> {{location}}</li>
      <li><strong>🏡 Remote friendly:</strong> {{remote_friendly}}</li>
    </ul>

    <a class="cta-button" href="https://fluttergigs.com/jobs/{{job_slug}}">
      🔎 View & Apply Now
    </a>

    <div class="share-section">
      <p>Know someone who’d be a great fit?
         👉 <a href="https://fluttergigs.com/jobs/{{job_slug}}" target="_blank">Share this opportunity</a> with your network.</p>
    </div>

    <p style="margin-top: 30px;">
      Thanks for being part of the FlutterGigs community 💙
      <br />Keep building. Keep thriving.
    </p>

    <div class="footer">
      You're receiving this email because you joined <strong>FlutterGigs</strong>.<br/>
      Follow us on <a href="https://x.com/fluttergigs" target="_blank">Twitter/X</a> for more updates.<br/>
      © {{current_year}} FlutterGigs. All rights reserved.
    </div>
  </div>
</body>
</html>

 `.replace('{{current_year}}', new Date().getFullYear().toString())
    .replace('{{user_name}}', data.username)
    .replace('{{job_title}}', data.jobTitle)
    .replace('{{company_name}}', data.companyName)
    .replace('{{location}}', data.location)
    .replace('{{job_slug}}', data.jobSlug)
    .replace('{{remote_friendly}}', data.remoteFriendly);
}

export default getInstantJobOfferEmailTemplate;



