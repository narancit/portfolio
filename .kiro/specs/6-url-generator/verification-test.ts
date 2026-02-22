/**
 * Manual verification tests for URL Generator checkpoint
 * This file contains test cases to verify basic functionality
 */

import { generateUrl } from '@/lib/url-utils';
import type { QueryParameter } from '@/types/url-generator';

// Test 1: Basic URL generation with base URL and parameters
console.log('Test 1: Basic URL generation');
const params1: QueryParameter[] = [
  { id: '1', name: 'search', value: 'test' },
  { id: '2', name: 'page', value: '1' },
];
const result1 = generateUrl('https://example.com/api', params1);
console.log('Expected: https://example.com/api?search=test&page=1');
console.log('Actual:', result1);
console.log('Pass:', result1 === 'https://example.com/api?search=test&page=1');
console.log('');

// Test 2: Base URL with existing query string
console.log('Test 2: Base URL with existing query string');
const params2: QueryParameter[] = [
  { id: '1', name: 'filter', value: 'active' },
];
const result2 = generateUrl('https://example.com/api?existing=param', params2);
console.log('Expected: https://example.com/api?existing=param&filter=active');
console.log('Actual:', result2);
console.log(
  'Pass:',
  result2 === 'https://example.com/api?existing=param&filter=active',
);
console.log('');

// Test 3: Empty base URL with parameters
console.log('Test 3: Empty base URL with parameters');
const params3: QueryParameter[] = [{ id: '1', name: 'key', value: 'value' }];
const result3 = generateUrl('', params3);
console.log('Expected: ?key=value');
console.log('Actual:', result3);
console.log('Pass:', result3 === '?key=value');
console.log('');

// Test 4: Special characters encoding
console.log('Test 4: Special characters encoding');
const params4: QueryParameter[] = [
  { id: '1', name: 'query', value: 'hello world' },
  { id: '2', name: 'special', value: 'a&b=c' },
];
const result4 = generateUrl('https://example.com', params4);
console.log(
  'Expected: https://example.com?query=hello%20world&special=a%26b%3Dc',
);
console.log('Actual:', result4);
console.log(
  'Pass:',
  result4 === 'https://example.com?query=hello%20world&special=a%26b%3Dc',
);
console.log('');

// Test 5: Empty parameter names are filtered out
console.log('Test 5: Empty parameter names filtered');
const params5: QueryParameter[] = [
  { id: '1', name: '', value: 'ignored' },
  { id: '2', name: 'valid', value: 'included' },
];
const result5 = generateUrl('https://example.com', params5);
console.log('Expected: https://example.com?valid=included');
console.log('Actual:', result5);
console.log('Pass:', result5 === 'https://example.com?valid=included');
console.log('');

// Test 6: No parameters returns base URL
console.log('Test 6: No parameters returns base URL');
const params6: QueryParameter[] = [];
const result6 = generateUrl('https://example.com/path', params6);
console.log('Expected: https://example.com/path');
console.log('Actual:', result6);
console.log('Pass:', result6 === 'https://example.com/path');
