// --- Sticky header: appear after scroll ---
(function(){
  const header = document.getElementById('siteHeader');
  function onScroll(){
    if(window.scrollY > 80) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
})();

// --- Forum functionality ---
(function(){
  const forum = document.getElementById('forum');
  const input = document.getElementById('forumInput');
  const postBtn = document.getElementById('postBtn');
  const clearBtn = document.getElementById('clearForum');

  function escapeHtml(text){
    const map = { '&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;','\'':'&#039;'};
    return String(text).replace(/[&<>\"']/g,function(m){return map[m]});
  }

  function addPost(){
    const val = input.value.trim();
    if(!val) return;
    const div = document.createElement('div');
    div.className = 'post';
    const date = new Date();
    div.innerHTML = `<strong>Usuario Anónimo</strong> <small class=\"ms-2 text-muted\">${date.toLocaleString()}</small><p>${escapeHtml(val)}</p>`;
    forum.prepend(div);
    input.value = '';
  }

  postBtn.addEventListener('click', addPost);
  clearBtn.addEventListener('click', ()=>{forum.innerHTML='';});
})();

// --- Register form (simple feedback + localStorage record) ---
(function(){
  const form = document.getElementById('registerForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    // Save to localStorage as demo
    const arr = JSON.parse(localStorage.getItem('elite_registrations')||'[]');
    arr.push({...data, at: new Date().toISOString()});
    localStorage.setItem('elite_registrations', JSON.stringify(arr));
    alert('¡Registro enviado! Gracias, ' + (data.name||'') );
    form.reset();
  });
})();

