/* global localStorage */

export default {
    save(key, value, expirationSec) {
      if (typeof Storage === 'undefined') {
        return false;
      }
      const expirationMS = expirationSec * 1000;
      const record = { value, timestamp: new Date().getTime() + expirationMS };
      localStorage.setItem(key, JSON.stringify(record));
      return value;
    },
    load(key) {
      if (typeof Storage === 'undefined') {
        return false;
      }
      try {
        if (localStorage.getItem(key) !== null) {
          const record = JSON.parse(localStorage.getItem(key));
          if (!record) {
            return false;
          }
          return new Date().getTime() < record.timestamp && record.value;
        }
        return false;
      } catch (e) {
        return false;
      }
    },
    remove(key) {
      if (typeof Storage === 'undefined') {
        return false;
      }
      if (localStorage.getItem(key) !== null) {
        localStorage.removeItem(key);
      }
      return true;
    },
    update(key, value) {
      if (typeof Storage === 'undefined') { return false; }
      try {
        const record = JSON.parse(localStorage.getItem(key));
        if (!record) {
          return false;
        }
        const updatedRecord = { value, timestamp: record.timestamp };
        localStorage.setItem(key, JSON.stringify(updatedRecord));
        return updatedRecord;
      } catch (e) {
        return false;
      }
    },
  };
  