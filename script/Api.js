class Api {
  constructor(apiURL, cohort, token) {
    this.cohort = cohort;
    this.token = token;
    this.apiURL = apiURL;
  }

  getUserInfo() {
    return this._buildRequest({method: 'GET', path: 'users/me'});
  }

  getCards() {
    return this._buildRequest({method: 'GET', path: 'cards'});
  }

  updateUserInfo(jsonObj) {
    return this._buildRequest({method: 'PATCH', path: 'users/me', contentType: 'application/json', jsonObj});
  }

  postNewCard(jsonObj) {
    return this._buildRequest({method: 'POST', path: 'cards', contentType: 'application/json', jsonObj});
  }

  deleteCard(id) {
    return this._buildRequest({method: 'DELETE', path: `cards/${id}`});
  }

  updateUserAvatar(jsonObj) {
    return this._buildRequest({method: 'PATCH', path: 'users/me/avatar', contentType: 'application/json', jsonObj});
  }

  toggleLike(state, id) {
    const method = (state) ? 'PUT' : 'DELETE';
    return this._buildRequest({method: method, path: `cards/like/${id}`, contentType: 'application/json'});
  }

  _buildRequest(obj) {
    return fetch(
      `${this.apiURL}/${this.cohort}/${obj.path}`,
      {
        'method': obj.method,
        'headers': {
          'authorization': this.token,
          'Content-Type': obj.contentType,
        },
        'body': JSON.stringify(obj.jsonObj)
      }
    ).then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  showAlert(err) {
    alert(`Упс... ${err}`);
  }
}


// Надо исправить
// Не очень понятно чем класс Api отличается от fetch или функциональной обертки для fetch.
// buildRequest -- это такой хороший приватный метод для класса, но у класса должны быть
// более простые и понятные пользователю публичные методы, например:
// getUserInfo, updateUserInfo, putLike, removeLike и так далее, которые будут использоваться пользователем
// А уж эти методы могут вызывать buildRequest
// Иными словами класс должен упрощать работу с fetch.

// Представьте ситуацию, когда изменлся не адрес сервера, а путь или принцип формирования пути на нем.
// При вашей реализации придется исправлять ошибки во всех классах, где вы применили buildRequest
// При корректной реализации -- мы вносим исправления в один класс, а если мы класс Api прозорливо научило конфиг с путями приминимать,
// то вообще только объект конфига поправим.

// Методы Api должны возвращать объект с необходимыми пользователю данными, возможно даже обработанными каким-то образом для большего
// удобства