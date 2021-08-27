/*
 * @Description: store.app.ts
 * @Date: 2021-08-23 18:03:22
 * @Author: LeiLiu
 */
import { action, autorun, computed, makeObservable, observable } from 'mobx';

type localeTypes = 'en' | 'zh';

const getDefaultLocale = (): localeTypes => {
  const isZh = /^zh/i.test(window.navigator.language);
  const locale = window.localStorage.getItem('locale') as localeTypes;
  return ['zh', 'en'].includes(locale) ? locale : isZh ? 'zh' : 'en';
};

class App {
  constructor() {
    makeObservable(this);
  }

  @observable
  spinning = false;

  @observable
  locale = getDefaultLocale();

  @action.bound
  updateSpinning() {
    this.spinning = !this.spinning;
  }

  @action.bound
  updateLocale(l: localeTypes) {
    this.locale = l;
    window.localStorage.setItem('locale', l);
  }
}

const app = new App();

autorun(() => {
  console.log('spinning: ' + app.spinning);
});

export default app;
