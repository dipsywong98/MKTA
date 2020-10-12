export const isDefined = (x) => x !== undefined && x !== null

export const fullUrl = (url) => (window.location.pathname + '/' + url).replace('//','/')
