// master.js

(function (global) {
  /**
   * Inject raw HTML markup into <head>, executing <script> tags.
   */
  function injectHeadSnippet(html) {
    if (!html) return;

    var container = document.createElement('div');
    container.innerHTML = html;

    // Move <meta>, <link>, and <style> tags to <head>
    container.querySelectorAll('meta, link, style').forEach(function (node) {
      document.head.appendChild(node);
    });

    // Recreate <script> tags so they actually execute
    container.querySelectorAll('script').forEach(function (oldScript) {
      var script = document.createElement('script');

      // Copy attributes (src, async, defer, etc.)
      Array.prototype.forEach.call(oldScript.attributes, function (attr) {
        script.setAttribute(attr.name, attr.value);
      });

      // Inline script content
      if (!script.src) {
        script.text = oldScript.textContent;
      }

      document.head.appendChild(script);
    });
  }

  /**
   * Public API: load a tracking snippet file into <head>.
   * Call this from a tiny inline snippet on each page.
   */
  function loadTrackingSnippet(url) {
    if (!url) return;

    // Prevent double-injection per URL
    var flagKey = '__HEAD_SNIPPET_LOADED__' + url;
    if (global[flagKey]) return;
    global[flagKey] = true;

    fetch(url, { cache: 'no-cache' })
      .then(function (resp) {
        if (!resp.ok) throw new Error('Failed to load head snippet: ' + resp.status);
        return resp.text();
      })
      .then(injectHeadSnippet)
      .catch(function (err) {
        // Silent for users, visible in console for you
        console.warn(err);
      });
  }

  // Expose globally so pages can call it
  global.loadTrackingSnippet = loadTrackingSnippet;
})(window);
