const { configure } = require('indicative');


class validatorFormatter {
  constructor() {
    this.errors = []
  }

  addError(error, field, validation) {
    let message = error.replace('_', ' ');

    if (error instanceof Error) {
      validation = 'ENGINE_EXCEPTION';
      message = error.message
    }

    this.errors.push({
      field, validation, message
    })
  }

  renameKeys(keysMap, obj) {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        ...{[keysMap[key] || key]: obj[key]}
      }),
      {}
    );
  };

  formattedErrors() {
    let keys = [];
    this.errors.forEach(error => {
      keys.push(
        error.field
      )
    });
    return this.renameKeys(keys, this.errors)
  }

  toJSON() {
    return this.errors.length ? this.formattedErrors() : null
  }
}

configure({
  FORMATTER: validatorFormatter
});

module.exports = validatorFormatter;
