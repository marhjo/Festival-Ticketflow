// Eksporterer en funktion til at validere email adresser.
export const validateEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(
      // Brug et regulært udtryk (regular expression) til at tjekke email formatet.
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
