(function(){
  var base = document.currentScript.dataset.base || '/';

  function resolve(path){
    // Build an absolute path under the site base (handles nested pages)
    if (path.startsWith('/')) return (base.replace(/\/+$/,'') + path);
    return base.replace(/\/+$/,'') + '/' + path.replace(/^\/+/,'');
  }

  function include(el){
    var src = el.getAttribute('data-include');
    if(!src) return;
    fetch(resolve(src), {cache:'no-cache'})
      .then(r => r.ok ? r.text() : Promise.reject(r))
      .then(html => { el.innerHTML = html; })
      .catch(err => { console.error('Include failed:', src, err); });
  }

  document.querySelectorAll('[data-include]').forEach(include);
})();
