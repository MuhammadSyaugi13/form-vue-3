export const getArrayIndexes = (length, limit, offset) => {
    if (!length) {
      return { from: -1, to: -1 }
    }
    let pages = Math.ceil(length / limit);
      
    let from = (offset - 1) * limit;
      
    let to =
        (offset === pages
          ? length
          : from + limit) - 1;
    
    return { from, to }
}

const getParams = () => new URLSearchParams(window.location.search);

export const addToHistory = (key, value) => {
    let params = getParams();
    params.set(key, value);
    history.pushState({}, "", `?${params.toString()}`);
  }

export const getFromHistory = (key, defaultValue = null) => {
    let params = getParams();
    let value = params.has(key) ? params.get(key) : defaultValue;
    return !value || isNaN(value) ? value : parseInt(value);
  }