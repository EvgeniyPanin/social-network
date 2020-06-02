class CreateRequest {
    constructor(apiURL, cohort, token) {
        this.cohort = cohort;
        this.token = token;
        this.apiURL = apiURL;
    }

    buildRequest(obj) {
        return fetch(`${this.apiURL}/${this.cohort}/${obj.path}`, {
            'method': obj.method,
            headers: {
                authorization: this.token,
                'Content-Type': obj.contentType,
            },
            body: JSON.stringify(obj.jsonObj)
        })
    }
}