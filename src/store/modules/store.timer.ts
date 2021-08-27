/*
 * @Description: store.timer.ts
 * @Date: 2021-08-23 09:35:46
 * @Author: LeiLiu
 */
import { action, makeObservable, observable } from 'mobx';

class Timer {
  constructor() {
    makeObservable(this);
  }

  @observable
  secondsPassed = 0;

  @action.bound
  increaseTimer() {
    this.secondsPassed += 1;
  }
}

export default new Timer();
