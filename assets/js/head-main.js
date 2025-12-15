// assets/js/head-main.js

(function (global) {
  /**
   * Inject raw HTML into <head>, executing scripts.
   */
  function injectHeadSnippet(html) {
    if (!html || !document.head) return;

    var container = document.createElement('div');
    container.innerHTML = html;

    // Move <meta>, <link>, <style> into <head>
    container.querySelectorAll('meta, link, style').forEach(function (node) {
      document.head.appendChild(node);
    });

    // Recreate <script> tags so they execute
    container.querySelectorAll('script').forEach(function (oldScript) {
      var script = document.createElement('script');

      // Copy attributes (src, async, defer, etc.)
      Array.prototype.forEach.call(oldScript.attributes, function (attr) {
        script.setAttribute(attr.name, attr.value);
      });

      // Inline JS
      if (!script.src) {
        script.text = oldScript.textContent || '';
      }

      document.head.appendChild(script);
    });
  }

  /**
   * Public API – load a tracking partial into <head>.
   * Example: loadTrackingSnippet('/partials/tracking-snippet.html');
   */
  function loadTrackingSnippet(url) {
    if (!url) return;

    // Prevent double load per URL
    var flagKey = '__HEAD_SNIPPET_LOADED__' + url;
    if (global[flagKey]) return;
    global[flagKey] = true;

    fetch(url, { cache: 'no-cache' })
      .then(function (resp) {
        if (!resp.ok) {
          throw new Error('Failed to load head snippet: ' + resp.status);
        }
        return resp.text();
      })
      .then(injectHeadSnippet)
      .catch(function (err) {
        // Only complain in console so users don’t see noise
        console.warn(err);
      });
  }

  // Expose globally
  global.loadTrackingSnippet = loadTrackingSnippet;
})(window);
