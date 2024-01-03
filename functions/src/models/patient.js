import validateType from "../validators/validateType.js";

/**
 * Represent a Patient.
 * @class
 */
export default class Patient {
  /**
     * Creates a new Patient instance.
     * @constructor
     * @param {string} name
     * @param {string} fatherLastName
     * @param {string} motherLastName
     * @param {string} socialSecurityNumber
     * @param {boolean} accessible
 */
  constructor(
      name,
      fatherLastName,
      motherLastName,
      socialSecurityNumber,
      accessible,
  ) {
    validateType(name, "string", "name");
    this.name = name;

    validateType(fatherLastName, "string", "fatherLastName");
    this.fatherLastName = fatherLastName;

    validateType(motherLastName, "string", "motherLastName");
    this.motherLastName = motherLastName;

    validateType(socialSecurityNumber, "string", "socialSecurityNumber");
    this.socialSecurityNumber = socialSecurityNumber;

    validateType(accessible, "boolean", "accessible");
    this.accessible = accessible;
  }
  /**
 * Returns the database representation of the Patient object.
 * @return {Object}
 */
  dbRepresentation() {
    return {
      "Nombre": this.name,
      "Apellido Paterno": this.fatherLastName,
      "Apellido Materno": this.motherLastName,
      "Número de seguridad social": this.socialSecurityNumber,
      "Accesible": this.accessible,
    };
  }
}
