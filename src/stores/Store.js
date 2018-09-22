import { observable, decorate } from 'mobx';
import AuthStore from './AuthStore';
import ApolloClient from 'apollo-boost';

export default class Store {
  loading = true;
  message = 'hi';
  constructor() {
    this.client = new ApolloClient({
      uri: 'https://api.foodtomake.com/graphql'
    });
    this.authStore = new AuthStore(this);
  }
}
decorate(Store, {
  loading: observable,
  message: observable
});
