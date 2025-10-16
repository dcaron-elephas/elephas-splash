// Dynamic year
(function(){
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Progressive-enhancement AJAX submit (works with static hosts + external endpoints like Formspree)
(function(){
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if(!form) return;

  form.addEventListener('submit', async function(e){
    e.preventDefault();

    // Honeypot: block bots that fill hidden field
    var hp = form.querySelector('#website');
    if (hp && hp.value) return; 

    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    var originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    status.className = 'status';
    status.textContent = '';

    try{
      var data = new FormData(form);
      var res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      });

      if(res.ok){
        form.reset();
        status.classList.add('ok');
        status.textContent = 'Thanks! We\'ll be in touch shortly.';
      } else {
        var msg = 'Oops—something went wrong. Please try again.';
        try{
          var out = await res.json();
          if(out && out.errors){ msg = out.errors.map(function(e){return e.message}).join(', '); }
        }catch(_){ }
        status.classList.add('err');
        status.textContent = msg;
      }
    }catch(err){
      status.classList.add('err');
      status.textContent = 'Network error—please check your connection and try again.';
    }finally{
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
})();