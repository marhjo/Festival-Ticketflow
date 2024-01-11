// Exports a function that validates an email address.
export const validateEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(
      // Uses a regular expression to validate an email address.
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
