/**
 * Google Apps Script — Portfolio Contact Form Handler
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com and create a new project.
 * 2. Replace the default Code.gs content with this entire file.
 * 3. At the top of the script, update YOUR_EMAIL if needed.
 * 4. Click Deploy → New deployment.
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployed Web App URL.
 * 6. Add it to your .env.local:
 *      NEXT_PUBLIC_CONTACT_FORM_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
 * 7. Also add the same URL as an Environment Variable in your Vercel project settings.
 *
 * The script will:
 *   - Append each submission as a row in a Google Sheet (auto-created on first run)
 *   - Send you an email notification with the visitor's details
 */

// ——— CONFIGURATION ———
var NOTIFICATION_EMAIL = "heyitsgautham@gmail.com";
var SPREADSHEET_NAME = "Portfolio Contact Submissions";

// ——— DO NOT EDIT BELOW THIS LINE ———

function doPost(e) {
  try {
    var postData = JSON.parse(e.postData.contents);

    // 1. Log to Google Sheet
    var sheet = getOrCreateSheet();
    sheet.appendRow([
      new Date(),
      postData.name,
      postData.email,
      postData.subject,
      postData.message,
    ]);

    // 2. Send email notification
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: "New Portfolio Contact: " + postData.subject,
      htmlBody:
        "<h2>New Contact Form Submission</h2>" +
        "<p><strong>Name:</strong> " + postData.name + "</p>" +
        "<p><strong>Email:</strong> " + postData.email + "</p>" +
        "<p><strong>Subject:</strong> " + postData.subject + "</p>" +
        "<p><strong>Message:</strong></p>" +
        "<p>" + postData.message.replace(/\n/g, "<br>") + "</p>",
      replyTo: postData.email,
    });

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Message sent successfully" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Contact form endpoint is live." })
  ).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  var files = DriveApp.getFilesByName(SPREADSHEET_NAME);

  if (files.hasNext()) {
    var spreadsheet = SpreadsheetApp.open(files.next());
    return spreadsheet.getActiveSheet();
  }

  // Create new spreadsheet with headers
  var spreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);
  var sheet = spreadsheet.getActiveSheet();
  sheet.appendRow(["Timestamp", "Name", "Email", "Subject", "Message"]);

  // Bold the header row
  sheet.getRange("A1:E1").setFontWeight("bold");

  return sheet;
}
