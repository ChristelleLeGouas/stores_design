function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Feuille1");
  var data = JSON.parse(e.postData.contents);

  // Ajouter une nouvelle ligne à la fin
  sheet.appendRow([data.id, data.Titre, data.Description, data.Image]);

  return ContentService.createTextOutput(
    JSON.stringify({ result: "success" })
  ).setMimeType(ContentService.MimeType.JSON);
}
