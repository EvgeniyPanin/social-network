class UserInfo {
    constructor(userName, aboutUser, userAvatar) {
        this.userName = userName;
        this.aboutUser = aboutUser;
        this.userAvatar = userAvatar;
    }

    setUserInfo(form) {
        const {name, about} = form.elements;
        name.value = this.userName.textContent;
        about.value = this.aboutUser.textContent;
    }

    updateUserInfo(name, about, linkAvatar) {
        this.userName.textContent = name;
        this.aboutUser.textContent = about;
        this.userAvatar.style.backgroundImage = `url(${linkAvatar})`;
    }
}