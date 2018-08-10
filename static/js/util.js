export default {
  install(Vue, options) {
    Vue.prototype.getCookie = function (cname) {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return "";
    }
    Vue.prototype.delCookie = function (name) {
      let date = new Date();
      date.setTime(date.getTime() - 1);
      let cval = this.getCookie(name);
      if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + date.toGMTString();
    }
  }
}
