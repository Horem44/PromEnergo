const isFormValid = (validationResult: any) => {
    for(let result in validationResult) {
        if(result !== 'formIsValid' && !validationResult[result].isValid) {
            return false;
        }
    }

    return true;
}

export default isFormValid;