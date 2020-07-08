class Api {
  constructor(config) {
    this.cohort = config.cohort;
    this.token = config.token;
    this.apiURL = config.apiURL;
    this.pathUser = config.pathUser;
    this.pathCards = config.pathCards;
    this.pathAvatar = config.pathAvatar;
    this.pathLike = config.pathLike;
  }

  getUserInfo() {
    return this._buildRequest({ 
      method: 'GET', 
      path: this.pathUser});
  }

  getCards() {
    return this._buildRequest({ 
      method: 'GET', 
      path: this.pathCards })
  }

  updateUserInfo(jsonObj) {
    return this._buildRequest({ 
      method: 'PATCH', 
      path: this.pathUser, 
      contentType: 'application/json', 
      jsonObj });
  }

  postNewCard(jsonObj) {
    return this._buildRequest({ 
      method: 'POST', 
      path: this.pathCards, 
      contentType: 'application/json', 
      jsonObj });
  }

  deleteCard(id) {
    return this._buildRequest({ 
      method: 'DELETE', 
      path: `${this.pathCards}/${id}` });
  }

  updateUserAvatar(jsonObj) {
    return this._buildRequest({ 
      method: 'PATCH', 
      path: this.pathAvatar, 
      contentType: 'application/json', 
      jsonObj });
  }

  toggleLike(state, id) {
    const method = (state) ? 'PUT' : 'DELETE';
    
    return this._buildRequest({
      method,
      path: `${this.pathLike}/${id}`,
      contentType: 'application/json'
    });
  }

  _buildRequest(obj) {
    return fetch(
      `${this.apiURL}/${this.cohort}/${obj.path}`,
      {
        method: obj.method,
        headers: {
          authorization: this.token,
          'Content-Type': obj.contentType,
        },
        body: JSON.stringify(obj.jsonObj)
      }
    ).then(res => {
      if (res.ok) return res.json();
      return Promise.reject(new Error(`Ошибка ${res.status}`));
    })
  }

  showAlert(err) {
    alert(`Упс... ${err}`);
  }
}
