// Dynamic year
(function(){
  document.querySelectorAll('#year').forEach(function(y){ y.textContent = new Date().getFullYear(); });
})();

// Progressive enhancement: AJAX submit to Formspree
(function(){
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if(!form) return;
  form.addEventListener('submit', async function(e){
    e.preventDefault();
    var hp = form.querySelector('#website'); if (hp && hp.value) return;
    var btn = form.querySelector('button[type="submit"]');
    var original = btn.textContent; btn.disabled = true; btn.textContent = 'Sending…';
    status.className = 'status'; status.textContent = '';
    try{
      var res = await fetch(form.action, { method:'POST', headers:{'Accept':'application/json'}, body:new FormData(form) });
      if(res.ok){ form.reset(); status.classList.add('ok'); status.textContent = 'Thanks! We\'ll be in touch shortly.'; }
      else{
        var msg = 'Oops—something went wrong. Please try again.';
        try{ var out = await res.json(); if(out && out.errors){ msg = out.errors.map(function(e){return e.message}).join(', '); } }catch(_){}
        status.classList.add('err'); status.textContent = msg;
      }
    }catch(_){ status.classList.add('err'); status.textContent = 'Network error—please try again.'; }
    finally{ btn.disabled = false; btn.textContent = original; }
  });
})();