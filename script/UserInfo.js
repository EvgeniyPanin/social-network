class UserInfo {
  constructor(userName, aboutUser, userAvatar) {
    this.userName = userName;
    this.aboutUser = aboutUser;
    this.userAvatar = userAvatar;
  }

  setUserInfo(data) {
    this.userData = data;
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

// Надо исправить +
// Тут следует изменить концепцию
// Создаем экземпляр класса, который на вход получит элементы страницы (как сейчас и сделано)
// Форму выкидываем напрочь, это вообще не зона отсветственности класса (даже если в название прошлого спринта посмотреть)
// setUserInfo принимает как аргументы значения имени, професии, аватара, полученные с сервера (не из DOM, DOM -- не хранилище)
// updateUserInfo -- с ним все хорошо, но он ничего не должен принимать на вход, он из внутренних переменных класса данные берет
// Еще нужен метод getUserInfo -- который будет возвращать объект с актуальными данными пользователя.
// Это метод будете вызывать, когда пондобятся данные для подстановки в инпуты формы.