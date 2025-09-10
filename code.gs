// -----------------------------
// Fonction POST : ajouter un projet
// -----------------------------
function doPost(e) {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Feuille1");
    const data = JSON.parse(e.postData.contents);

    // Ajouter une nouvelle ligne à la fin
    sheet.appendRow([data.id, data.Titre, data.Description, data.Image]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: err })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// -----------------------------
// Fonction GET : récupérer tous les projets
// -----------------------------
function doGet() {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Feuille1");
    const data = sheet.getDataRange().getValues(); // récupère toutes les lignes

    // Retourne en JSON
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: err })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
