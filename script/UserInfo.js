class UserInfo {
    constructor() {
        this.userName = document.querySelector('.user-info__name');
        this.aboutUser = document.querySelector('.user-info__job');
    }

    setUserInfo(form) {
        const {name, about} = form.elements;
        name.value = this.userName.textContent;
        about.value = this.aboutUser.textContent;
    }

    updateUserInfo(name, about) {
        this.userName.textContent = name;
        this.aboutUser.textContent = about;
    }
}