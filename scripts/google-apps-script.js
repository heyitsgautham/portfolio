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

var FIELD_LIMITS = {
  name: { min: 2, max: 200 },
  email: { min: 3, max: 320 },
  subject: { min: 3, max: 300 },
  message: { min: 10, max: 10000 },
};

var EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

/**
 * Checks a submission the same way the site's form does, since anyone can
 * POST to this endpoint directly. Returns an error message, or null.
 */
function validateSubmission(data) {
  if (!data || typeof data !== "object") {
    return "Invalid submission.";
  }

  for (var field in FIELD_LIMITS) {
    var value = data[field];
    var limits = FIELD_LIMITS[field];
    if (typeof value !== "string") {
      return "Missing " + field + ".";
    }
    var length = value.trim().length;
    if (length < limits.min || length > limits.max) {
      return (
        "The " + field + " must be " + limits.min + " to " + limits.max +
        " characters."
      );
    }
  }

  if (!EMAIL_PATTERN.test(data.email.trim())) {
    return "Please enter a valid email address.";
  }

  return null;
}

/** Escapes text for the HTML body of the notification email. */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Stops Google Sheets from reading a submitted value as a formula.
 * appendRow treats text starting with =, +, - or @ as a formula.
 */
function sheetSafe(value) {
  var text = String(value);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  try {
    var postData = JSON.parse(e.postData.contents);

    var problem = validateSubmission(postData);
    if (problem) {
      return jsonResponse({ status: "error", message: problem });
    }

    var name = postData.name.trim();
    var email = postData.email.trim();
    var subject = postData.subject.trim();
    var message = postData.message.trim();

    // 1. Log to Google Sheet
    var sheet = getOrCreateSheet();
    sheet.appendRow([
      new Date(),
      sheetSafe(name),
      sheetSafe(email),
      sheetSafe(subject),
      sheetSafe(message),
    ]);

    // 2. Send email notification
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: "New Portfolio Contact: " + subject.replace(/[\r\n]+/g, " "),
      htmlBody:
        "<h2>New Contact Form Submission</h2>" +
        "<p><strong>Name:</strong> " + escapeHtml(name) + "</p>" +
        "<p><strong>Email:</strong> " + escapeHtml(email) + "</p>" +
        "<p><strong>Subject:</strong> " + escapeHtml(subject) + "</p>" +
        "<p><strong>Message:</strong></p>" +
        "<p>" + escapeHtml(message).replace(/\n/g, "<br>") + "</p>",
      replyTo: email,
    });

    return jsonResponse({
      status: "success",
      message: "Message sent successfully",
    });
  } catch (error) {
    return jsonResponse({ status: "error", message: error.toString() });
  }
}

function doGet() {
  return jsonResponse({ status: "ok", message: "Contact form endpoint is live." });
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
