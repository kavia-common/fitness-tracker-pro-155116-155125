//
// PUBLIC_INTERFACE
// storage.js - Safe helpers for localStorage with JSON support.
//
/**
 * PUBLIC_INTERFACE
 * getStorage safely retrieves a value from localStorage and parses JSON if possible.
 * @param {string} key - The storage key.
 * @param {*} fallback - Fallback value if not present or parse fails.
 * @returns {*} The stored value or fallback.
 */
export function getStorage(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  } catch {
    return fallback;
  }
}

/**
 * PUBLIC_INTERFACE
 * setStorage stores a value in localStorage, stringifying non-strings.
 * @param {string} key - The storage key.
 * @param {*} value - The value to store.
 */
export function setStorage(key, value) {
  try {
    const toWrite = typeof value === 'string' ? value : JSON.stringify(value);
    window.localStorage.setItem(key, toWrite);
  } catch {
    // no-op
  }
}

/**
 * PUBLIC_INTERFACE
 * removeStorage removes a key from localStorage.
 * @param {string} key - The storage key to remove.
 */
export function removeStorage(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // no-op
  }
}
