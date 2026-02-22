# Manual Edge Case Testing Guide

This guide provides step-by-step instructions to manually verify all edge cases for the URL Generator.

## Prerequisites

1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:3000/projects/url-generator`
3. Open browser DevTools Console to monitor error messages

---

## Test 1: Empty Base URL

### Test 1.1: Empty base URL with parameters

1. Leave "Base URL" field empty
2. Click "Add Parameter"
3. Enter name: `foo`, value: `bar`
4. **Expected Result:** Generated URL shows `?foo=bar`

### Test 1.2: Empty base URL with multiple parameters

1. Leave "Base URL" field empty
2. Add parameter: name `param1`, value `value1`
3. Add parameter: name `param2`, value `value2`
4. **Expected Result:** Generated URL shows `?param1=value1&param2=value2`

### Test 1.3: Empty base URL with empty parameter name

1. Leave "Base URL" field empty
2. Add parameter with empty name and value `test`
3. **Expected Result:** Generated URL is empty (parameter filtered out)

---

## Test 2: Base URL with Existing Query String

### Test 2.1: Base URL with existing parameter

1. Enter base URL: `https://example.com/api?existing=param`
2. Add parameter: name `new`, value `param`
3. **Expected Result:** `https://example.com/api?existing=param&new=param`

### Test 2.2: Base URL ending with `?`

1. Enter base URL: `https://example.com/api?`
2. Add parameter: name `foo`, value `bar`
3. **Expected Result:** `https://example.com/api?&foo=bar`

### Test 2.3: Base URL without query string

1. Enter base URL: `https://example.com/api`
2. Add parameter: name `foo`, value `bar`
3. **Expected Result:** `https://example.com/api?foo=bar`

---

## Test 3: Special Characters in Parameters

### Test 3.1: Spaces in values

1. Enter base URL: `https://example.com`
2. Add parameter: name `query`, value `hello world`
3. **Expected Result:** `https://example.com?query=hello%20world`

### Test 3.2: Ampersands in values

1. Enter base URL: `https://example.com`
2. Add parameter: name `param`, value `foo&bar`
3. **Expected Result:** `https://example.com?param=foo%26bar`

### Test 3.3: Equals signs in values

1. Enter base URL: `https://example.com`
2. Add parameter: name `param`, value `foo=bar`
3. **Expected Result:** `https://example.com?param=foo%3Dbar`

### Test 3.4: Question marks in values

1. Enter base URL: `https://example.com`
2. Add parameter: name `param`, value `foo?bar`
3. **Expected Result:** `https://example.com?param=foo%3Fbar`

### Test 3.5: Hash symbols in values

1. Enter base URL: `https://example.com`
2. Add parameter: name `param`, value `foo#bar`
3. **Expected Result:** `https://example.com?param=foo%23bar`

### Test 3.6: Forward slashes in values

1. Enter base URL: `https://example.com`
2. Add parameter: name `path`, value `foo/bar/baz`
3. **Expected Result:** `https://example.com?path=foo%2Fbar%2Fbaz`

### Test 3.7: Special characters in names

1. Enter base URL: `https://example.com`
2. Add parameter: name `param@name!`, value `value`
3. **Expected Result:** Name is properly encoded (contains `%` characters)

### Test 3.8: Unicode/Emoji in values

1. Enter base URL: `https://example.com`
2. Add parameter: name `emoji`, value `🚀`
3. **Expected Result:** `https://example.com?emoji=%F0%9F%9A%80` (or similar encoding)

### Test 3.9: Multiple special characters

1. Enter base URL: `https://example.com`
2. Add parameter: name `a`, value `foo bar`
3. Add parameter: name `b`, value `baz&qux`
4. Add parameter: name `c`, value `test=value`
5. **Expected Result:** All parameters properly encoded and joined with `&`

---

## Test 4: localStorage Disabled/Unavailable

### Test 4.1: Simulate localStorage error

1. Open DevTools Console
2. Run: `Object.defineProperty(window, 'localStorage', { get() { throw new Error('localStorage disabled'); } });`
3. Refresh the page
4. Try to use the URL Generator
5. **Expected Result:**
   - Console shows error messages
   - Application still functions (can generate URLs)
   - No crashes or broken UI

### Test 4.2: Verify graceful degradation

1. With localStorage disabled (from 4.1)
2. Generate a URL with parameters
3. Refresh the page
4. **Expected Result:**
   - Configuration is not restored (expected behavior)
   - Application loads without errors
   - Can still generate new URLs

### Test 4.3: Re-enable localStorage

1. Refresh the page normally (without localStorage override)
2. **Expected Result:** localStorage functionality restored

---

## Test 5: Clipboard API Unavailable

### Test 5.1: Test copy functionality

1. Generate a URL
2. Click the copy button
3. **Expected Result:**
   - Badge shows "Copied!"
   - Button icon changes to checkmark
   - URL is in clipboard (test by pasting)

### Test 5.2: Simulate clipboard error (if possible)

1. In some browsers, clipboard access requires HTTPS or localhost
2. If testing on HTTP, copy may fail
3. **Expected Result:**
   - Console shows error message
   - Application doesn't crash
   - URL text is selected for manual copying

---

## Test 6: Additional Edge Cases

### Test 6.1: Empty parameter values

1. Enter base URL: `https://example.com`
2. Add parameter: name `param`, value `` (empty)
3. **Expected Result:** `https://example.com?param=`

### Test 6.2: Whitespace-only parameter names

1. Add parameter: name `   ` (spaces only), value `test`
2. **Expected Result:** Parameter is filtered out, not included in URL

### Test 6.3: Duplicate parameter names

1. Enter base URL: `https://example.com`
2. Add parameter: name `param`, value `value1`
3. Add parameter: name `param`, value `value2`
4. **Expected Result:** `https://example.com?param=value1&param=value2`

### Test 6.4: Very long URLs

1. Enter base URL: `https://example.com/very/long/path/to/endpoint`
2. Add 10+ parameters with long names and values
3. **Expected Result:**
   - URL generates correctly
   - Display scrolls or wraps appropriately
   - Copy button still works

---

## Test 7: History Functionality with Edge Cases

### Test 7.1: History persists across refresh

1. Generate a URL with parameters
2. Refresh the page
3. **Expected Result:**
   - Current configuration restored
   - History shows the generated URL

### Test 7.2: History with localStorage disabled

1. Disable localStorage (see Test 4.1)
2. Generate URLs
3. **Expected Result:**
   - History doesn't persist
   - No errors or crashes

### Test 7.3: Load history entry with special characters

1. Generate URL with special characters in parameters
2. Click on the history entry to load it
3. **Expected Result:**
   - Configuration restored correctly
   - Special characters preserved in form fields
   - Generated URL matches original

---

## Test 8: Responsive Design Edge Cases

### Test 8.1: Mobile viewport

1. Resize browser to mobile width (< 768px)
2. Test all functionality
3. **Expected Result:**
   - Layout adapts appropriately
   - All buttons are tappable (44x44px minimum)
   - No horizontal scrolling

### Test 8.2: Tablet viewport

1. Resize browser to tablet width (768-1023px)
2. Test all functionality
3. **Expected Result:** Layout adapts appropriately

---

## Test 9: Keyboard Navigation

### Test 9.1: Tab through all elements

1. Click in address bar and press Tab repeatedly
2. **Expected Result:**
   - Focus moves through all interactive elements
   - Focus indicators are visible
   - Can reach all buttons and inputs

### Test 9.2: Keyboard operations

1. Use Tab to navigate to "Add Parameter" button
2. Press Enter or Space to activate
3. **Expected Result:** New parameter added

---

## Success Criteria

All tests should pass with:

- ✅ No JavaScript errors in console (except expected localStorage/clipboard errors)
- ✅ Application continues to function even when APIs fail
- ✅ URLs are generated correctly with proper encoding
- ✅ Special characters are handled properly
- ✅ Empty and edge case inputs don't break functionality
- ✅ Error messages are logged but don't crash the app

---

## Notes

- Some tests (like localStorage/clipboard simulation) may require specific browser DevTools commands
- All error handling should log to console but not break functionality
- The application should be fully functional even without localStorage or clipboard API
