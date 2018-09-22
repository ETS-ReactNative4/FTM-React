import { observable, action, decorate } from 'mobx';
import AuthService from '../services/AuthService';

export default class AuthStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  loggedIn = false;
  loading = false;
  jwt = '';
  error = '';

  async logout() {
    await this.setJwt('');
  }

  async setJwt(token) {
    this.jwt = token;
    this.loggedIn = token != '';
  }

  async createUser(id, username, source) {
    let service = new AuthService(this.rootStore.client);
    let data = await service.createUser(id, username, source);
    console.log(data);
    if (data && data.createUserSocial) {
      const { error, token } = data.createUserSocial;
      if (error) {
        if (error.code === 'DUPLICATE_USERNAME') {
          this.error = 'That username already exists.';
        } else {
          this.error = 'Please try again.';
        }
      } else {
        this.setJwt(token);
      }
    } else {
      this.error = 'Please try again.';
    }
  }
}
decorate(AuthStore, {
  loading: observable,
  loggedIn: observable,
  jwt: observable,
  logout: action,
  setJwt: action,
  createUser: action
});
