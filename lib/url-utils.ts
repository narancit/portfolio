/**
 * URL generation utilities for the URL Generator tool
 */

export interface QueryParameter {
  id: string;
  name: string;
  value: string;
}

/**
 * Generates a complete URL by combining a base URL with query parameters
 *
 * @param baseUrl - The base URL (can be empty)
 * @param parameters - Array of query parameters with name-value pairs
 * @returns The generated URL with properly encoded query parameters
 *
 * Requirements:
 * - 1.2: Updates generated URL when base URL changes
 * - 2.5: Properly encodes parameter names and values
 * - 4.1: Combines base URL with all parameters
 * - 4.3: Joins multiple parameters with "&"
 * - 4.4: Appends with "&" if base URL contains "?"
 * - 4.5: Appends with "?" if base URL doesn't contain "?"
 */
export function generateUrl(
  baseUrl: string,
  parameters: QueryParameter[],
): string {
  // Filter out parameters with empty names
  const validParameters = parameters.filter(
    (param) => param.name.trim() !== '',
  );

  // If no valid parameters, return base URL as-is
  if (validParameters.length === 0) {
    return baseUrl;
  }

  // Encode and format parameters as "name=value"
  const encodedParams = validParameters.map((param) => {
    const encodedName = encodeURIComponent(param.name);
    const encodedValue = encodeURIComponent(param.value);
    return `${encodedName}=${encodedValue}`;
  });

  // Join parameters with "&"
  const queryString = encodedParams.join('&');

  // Handle empty base URL - return just the query string with "?"
  if (baseUrl.trim() === '') {
    return `?${queryString}`;
  }

  // Check if base URL already contains "?"
  const separator = baseUrl.includes('?') ? '&' : '?';

  return `${baseUrl}${separator}${queryString}`;
}
