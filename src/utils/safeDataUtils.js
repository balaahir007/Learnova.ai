/**
 * Ensures data is always an array
 * @param {any} data - Data to convert to array
 * @returns {Array} - Always returns an array
 */
export const ensureArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (data?.items && Array.isArray(data.items)) return data.items;
  return [];
};

/**
 * Safely maps over data with fallback
 * @param {any} data - Data to map over
 * @param {Function} callback - Callback function
 * @returns {Array} - Result of mapping or empty array
 */
export const safeMap = (data, callback) => {
  const array = ensureArray(data);
  return Array.isArray(array) ? array.map(callback) : [];
};

/**
 * Safely filters data with fallback
 * @param {any} data - Data to filter
 * @param {Function} predicate - Filter predicate
 * @returns {Array} - Filtered array or empty array
 */
export const safeFilter = (data, predicate) => {
  const array = ensureArray(data);
  return Array.isArray(array) ? array.filter(predicate) : [];
};

/**
 * Gets value from nested object safely
 * @param {Object} obj - Object to access
 * @param {string} path - Path to property (e.g., 'data.items.0.name')
 * @param {any} defaultValue - Default value if path doesn't exist
 * @returns {any} - Value at path or default value
 */
export const safeGet = (obj, path, defaultValue = null) => {
  try {
    const value = path.split('.').reduce((acc, part) => {
      return acc?.[part];
    }, obj);
    return value !== undefined ? value : defaultValue;
  } catch {
    return defaultValue;
  }
};
