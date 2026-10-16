const views=[...document.querySelectorAll('[data-view]')], nav=document.getElementById('nav'), toast=document.getElementById('toast');
let toastTimer, chosen={name:'Laura Martínez',subject:'Matemáticas',price:'$45.000',initials:'LM'};
function notify(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
function go(id){if(!document.getElementById(id)||!document.getElementById(id).matches('[data-view]'))id='inicio';views.forEach(v=>v.classList.toggle('hidden',v.id!==id));document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+id));nav.classList.remove('open');if(location.hash!=='#'+id)history.pushState({},'', '#'+id);window.scrollTo({top:0,behavior:'smooth'})}
function hashRoute(){let id=location.hash.slice(1)||'inicio';if(document.getElementById(id)&&document.getElementById(id).matches('[data-view]')){views.forEach(v=>v.classList.toggle('hidden',v.id!==id));document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+id))}else go('inicio')}
window.addEventListener('hashchange',hashRoute);window.addEventListener('popstate',hashRoute);
document.addEventListener('click',e=>{
 const r=e.target.closest('[data-go]');if(r){e.preventDefault();go(r.dataset.go);return}
 const s=e.target.closest('[data-subject]');if(s){document.getElementById('subject').value=s.dataset.subject==='Ciencias'?'Física':s.dataset.subject;go('buscar');filterTutors()}
 const t=e.target.closest('[data-tutor]');if(t){let c=t.closest('.tutor');chosen={name:t.dataset.tutor,subject:c.dataset.subject,price:c.querySelector('.card-bottom strong').childNodes[0].textContent.trim(),initials:t.dataset.tutor.split(' ').map(x=>x[0]).join('')};document.getElementById('tutorName').textContent=chosen.name;document.getElementById('tutorSubject').textContent='Tutor/a de '+chosen.subject;document.getElementById('tutorPrice').textContent=chosen.price+' / hora';document.getElementById('initials').textContent=chosen.initials;go('perfil-tutor')}
 const p=e.target.closest('[data-person]');if(p){document.getElementById('chatName').textContent=p.dataset.person;document.getElementById('chatMessages').innerHTML='<p class="bubble received">Hola, esta es una conversación de demostración.</p>'}
});
document.getElementById('menuToggle').addEventListener('click',()=>nav.classList.toggle('open'));
document.getElementById('loginForm').addEventListener('submit',e=>{e.preventDefault();notify('Inicio de sesión de demostración: no se validaron credenciales.');go('inicio')});
document.getElementById('registerForm').addEventListener('submit',e=>{e.preventDefault();let role=document.getElementById('role').value;notify('Registro de demostración: no se guardaron datos.');go(role==='tutor'?'panel-tutor':'inicio')});
document.getElementById('recoverForm').addEventListener('submit',e=>{e.preventDefault();notify('Demostración: no se envió ningún correo.')});
document.getElementById('bookingForm').addEventListener('submit',e=>{e.preventDefault();notify('Reserva de demostración; no se guardó en una base de datos.');go('agenda')});
document.getElementById('profileForm').addEventListener('submit',e=>{e.preventDefault();notify('Cambios de demostración; no se guardaron permanentemente.')});
document.getElementById('messageForm').addEventListener('submit',e=>{e.preventDefault();let i=document.getElementById('messageInput'),v=i.value.trim();if(!v)return;let p=document.createElement('p');p.className='bubble sent';p.textContent=v;document.getElementById('chatMessages').appendChild(p);i.value='';notify('Mensaje añadido solo a esta vista.')});
document.getElementById('classForm').addEventListener('submit',e=>{e.preventDefault();let i=document.getElementById('classInput'),v=i.value.trim();if(!v)return;let p=document.createElement('p');p.className='bubble sent';p.textContent=v;document.getElementById('classChat').appendChild(p);i.value=''});
document.getElementById('markRead').addEventListener('click',()=>notify('Notificaciones marcadas como leídas en esta vista.'));
function filterTutors(){let q=document.getElementById('search').value.toLowerCase().trim(),s=document.getElementById('subject').value,p=Number(document.getElementById('price').value),n=0;document.querySelectorAll('#tutors .tutor').forEach(c=>{let ok=(c.dataset.name.includes(q)||c.dataset.subject.toLowerCase().includes(q))&&(!s||c.dataset.subject===s)&&Number(c.dataset.price)<=p;c.style.display=ok?'':'none';if(ok)n++});document.getElementById('count').textContent=n+' tutor(es) encontrados · perfiles de ejemplo'}
['search','subject','price'].forEach(id=>document.getElementById(id).addEventListener(id==='search'?'input':'change',filterTutors));
document.getElementById('sessionFilter').addEventListener('change',e=>document.querySelectorAll('#sessionRows tr').forEach(r=>r.style.display=!e.target.value||r.dataset.status===e.target.value?'':'none'));
hashRoute();
