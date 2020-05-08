function isValidity(field) {
    field.setCustomValidity("");
  
    if (field.validity.valueMissing) {
      field.setCustomValidity(errorMessage.textErrorEmptyString);
      return false
    }  
  
    if (field.validity.tooShort || field.validity.tooLong) {
      field.setCustomValidity(errorMessage.textErrorLength);
      return false
    }
  
    if (field.validity.typeMismatch && field.type === 'url') {
      field.setCustomValidity(errorMessage.textErrorURL);
      return false
    } 
  
    return field.checkValidity();
  }
  
  function isFieldValidity(field) {
    
    const errorElem = field.parentNode.querySelector(`#${field.id}-error`);
    const valid = isValidity(field)
    if (field === event.target) {
      errorElem.textContent = field.validationMessage;
    }
    
   
    return valid;
  }
  
  function checkFormValidity(event) {
    
    const currentForm = event.currentTarget;
    const inputs = Array.from(currentForm.elements);
    let valid = true;
    
    inputs.forEach(field => {
      if (field.type !== 'submit') {
        if (!isFieldValidity(field)) {valid = false};
      }
    })
    setSubmitButtonState(event, valid);
  }
  
  
   function setEventListeners(popup) {
        form = popup.querySelector('.popup__form')
  
        form.addEventListener('input', checkFormValidity);
  }
  
  setEventListeners(popupEditProfile);
  setEventListeners(popupAddPlace);