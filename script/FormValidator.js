class FormValidator {
    constructor(form) {
        this.form = form;
        this.inputs = [...form.querySelectorAll('input')];
        this.submitButton = form.querySelector('button');
        this.errorsObj = {};
        this.inputs.forEach(input => {
            this.errorsObj[input.id] = document.querySelector(`#${input.id}-error`);
        })
    }
    isValidity(input) {
        input.setCustomValidity("");

        if (input.validity.valueMissing) {
            input.setCustomValidity(errorMessage.textErrorEmptyString);
            return false
        }

        if (input.validity.tooShort || input.validity.tooLong) {
            input.setCustomValidity(errorMessage.textErrorLength);
            return false
        }

        if (input.validity.typeMismatch && input.type === 'url') {
            input.setCustomValidity(errorMessage.textErrorURL);
            return false
        }

        return input.checkValidity();
            }

    checkInputValidity(evt) {
        const input = evt.target;
        const valid = this.inputs.every(input => this.isValidity(input));
        const errorField = this.errorsObj[input.id];

        this.isValidity(input);
        errorField.textContent = input.validationMessage;

        this.setSubmitButtonState.bind(this, valid)();
    }

    setSubmitButtonState(state) {
        if (state) {
            this.submitButton.removeAttribute('disabled');
            this.submitButton.classList.remove('popup__button_disabled');
          } else {
            this.submitButton.setAttribute('disabled', true);
            this.submitButton.classList.add('popup__button_disabled');
          }
    }

    setEventListeners() {
        this.inputs.forEach(input => {
            input.addEventListener('input', this.checkInputValidity.bind(this));
        })

        const cleanErrors = () => {
            for (let key in this.errorsObj) {
              this.form.reset();
              this.errorsObj[key].textContent = '';
            }
          }
          return cleanErrors;
    }
}