'use strict';

module.exports = (err) => {
    // console.log(err.errors.email.message)
    const errorMessage = []
    let errorCaught = Object.keys(err.errors)
    errorCaught.forEach(field => {
        errorMessage.push(err.errors[field].message)
    });
    return errorMessage
}