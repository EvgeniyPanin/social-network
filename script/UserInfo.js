class UserInfo {
  constructor(userName, aboutUser, userAvatar) {
    this.userName = userName;
    this.aboutUser = aboutUser;
    this.userAvatar = userAvatar;
    // Можно лучше +
    this.userData = { name : '', about : '', avatar : '' };
    // Иначе если вызывать updateUserInfo до установки данных юзера -- будет неприятность
  }

  setUserInfo({ name, about, avatar }) {
    // Объект передается по ссылке
    // Если я его изменю потом, после вызова, то он и тут изменится
    // Лучше сделать так -- принять в метод через деструктуризацию объект
    // И из принятых переменных уже созрать свой собственный
    // Например
    // setUserInfo({ name, job, avatar }) {
      // this.userData = { name, about, avatar };
    // }
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
