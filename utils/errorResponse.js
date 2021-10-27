class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
module.exports = ErrorResponse;

/**cette class est un model qui me permet de l'exporter là où j'en ai besoin , une sorte de générique type*/
