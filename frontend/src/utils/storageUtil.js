 
const TOKEN_KEY = "ascykl_key";
const CURRENT_ROUTE = "currentRoute";

const parse = JSON.parse;
const stringify = JSON.stringify;

import cryptoUtil from "./encrypt"

/**
 *! I will be using only local storage
 */
const localStorageUtil = {
  /**
   * CLEAR
   */
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }
    return null;
  },

  // Clear all local storage
  clearAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }
  },

  clearToken() {
    return localStorageUtil.clear(TOKEN_KEY);
  },

  /**
   * GETTERS
   */
  get(key) {
    if (localStorage && localStorage.getItem(key)) {
      return parse(localStorage.getItem(key)) || null;
    }
    return null;
  },
  getSecure(key) {
    if (localStorage && localStorage.getItem(key)) {
        let hash = parse(localStorage.getItem(key)) || null;
        if(hash)
            return parse(cryptoUtil.decrypt(hash))
        return null
    }

    return null;
  },

  getToken() {
    return localStorageUtil.get(TOKEN_KEY);
  },

  getCurrentRoute() {
    return localStorageUtil.get(CURRENT_ROUTE);
  },

  /**
   * SETTERS
   */
  set(value, key) {
    if (localStorage) {
      return localStorage.setItem(key, stringify(value));
    }

    return null;
  },
  setSecure(value, key) {
    if (localStorage) {
      let val = cryptoUtil.encrypt(stringify(value))
      return localStorage.setItem(key,JSON.stringify(val));
    }

    return null;
  },
  setToken(value) {
    return localStorageUtil.set(value, TOKEN_KEY);
  },
  setCurrentRoute(value) {
    return localStorageUtil.set(value, CURRENT_ROUTE);
  }
};

export default localStorageUtil;
