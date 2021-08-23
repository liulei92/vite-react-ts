/*
 * @Description: store.datex.ts
 * @Date: 2021-08-23 09:33:57
 * @Author: LeiLiu
 */
import { action, autorun, computed, makeObservable, observable } from 'mobx';

class Datex {
  constructor() {
    makeObservable(this);
  }

  @observable
  timeStamp = new Date().getTime();

  @computed
  get timeString() {
    return new Date(this.timeStamp).toLocaleTimeString();
  }

  @action.bound
  updateTimeStamp() {
    this.timeStamp = new Date().getTime();
  }
}

const datex = new Datex();

autorun(() => {
  console.log('timeStamp: ' + datex.timeStamp);
});

export default datex;
