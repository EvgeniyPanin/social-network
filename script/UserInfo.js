class UserInfo {
  constructor(userName, aboutUser, userAvatar) {
    this.userName = userName;
    this.aboutUser = aboutUser;
    this.userAvatar = userAvatar;
  }

  setUserInfo(form) {
    const { name, about } = form.elements;
    name.value = this.userName.textContent;
    about.value = this.aboutUser.textContent;
  }

  updateUserInfo(name, about, linkAvatar) {
    this.userName.textContent = name;
    this.aboutUser.textContent = about;
    this.userAvatar.style.backgroundImage = `url(${linkAvatar})`;
  }
}

// Надо исправить
// Тут следует изменить концепцию
// Создаем экземпляр класса, который на вход получит элементы страницы (как сейчас и сделано)
// Форму выкидываем напрочь, это вообще не зона отсветственности класса (даже если в название прошлого спринта посмотреть)
// setUserInfo принимает как аргументы значения имени, професии, аватара, полученные с сервера (не из DOM, DOM -- не хранилище)
// updateUserInfo -- с ним все хорошо, но он ничего не должен принимать на вход, он из внутренних переменных класса данные берет
// Еще нужен метод getUserInfo -- который будет возвращать объект с актуальными данными пользователя.
// Это метод будете вызывать, когда пондобятся данные для подстановки в инпуты формы.