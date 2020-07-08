export class UserInfo {
  constructor(userName, aboutUser, userAvatar) {
    this.userName = userName;
    this.aboutUser = aboutUser;
    this.userAvatar = userAvatar;
    this.userData = { name : '', about : '', avatar : '' };
  }

  setUserInfo({ name, about, avatar }) {
    this.userData = { name, about, avatar };
  }

  updateUserInfo() {
    this.userName.textContent = this.userData.name;
    this.aboutUser.textContent = this.userData.about;
    this.userAvatar.style.backgroundImage = `url(${this.userData.avatar})`;
  }

  getUserInfo() {
    return this.userData;
  }
}
