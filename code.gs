// -----------------------------
// Fonction GET : récupérer les projets
// -----------------------------
function doGet() {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Realisations");
    const data = sheet.getDataRange().getValues();

    // Transformer en tableau d'objets
    const headers = data[0];
    const rows = data.slice(1);
    const projets = rows.map((row) => {
      let obj = {};
      headers.forEach((h, i) => {
        obj[h] = row[i];
      });
      return obj;
    });

    return ContentService.createTextOutput(JSON.stringify(projets)).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// -----------------------------
// Fonction POST : ajouter un projet
// -----------------------------
function doPost(e) {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Realisations");
    const data = JSON.parse(e.postData.contents);

    // Ajouter une nouvelle ligne avec les valeurs
    sheet.appendRow([data.id, data.Titre, data.Description, data.Image]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
