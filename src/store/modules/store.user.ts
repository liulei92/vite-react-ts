/*
 * @Description: store.user.ts
 * @Date: 2021-08-23 16:45:07
 * @Author: LeiLiu
 */
import { action, makeObservable, observable } from 'mobx';

class User {
  constructor() {
    makeObservable(this);
  }

  @observable
  user = window.localStorage.getItem('user');

  @observable
  loginTime = 0;

  @action.bound
  login(user: string) {
    return new Promise((resolve, reject) => {
      if (user) {
        this.user = user;
        window.localStorage.setItem('user', user);
        this.loginTime = new Date().getTime();
        resolve(user);
      } else {
        reject('user is undefined');
      }
    });
  }

  @action.bound
  logout() {
    return new Promise((resolve, reject) => {
      if (this.user) {
        this.user = '';
        window.localStorage.removeItem('user');
        this.loginTime = 0;
        resolve(0);
      } else {
        reject('user is undefined');
      }
    });
  }
}

const user = new User();
export default user;
