const seedStudents=[{id:'KSSS-0001',name:'Amina Nakato',gender:'Female',class:'S.4',stream:'East',year:2026,guardian:'Sarah Nakato'},{id:'KSSS-0002',name:'Daniel Okello',gender:'Male',class:'S.3',stream:'West',year:2026,guardian:'Peter Okello'},{id:'KSSS-0003',name:'Grace Namukasa',gender:'Female',class:'S.2',stream:'North',year:2026,guardian:'James Namukasa'}];
let students=JSON.parse(localStorage.getItem('kitebiStudents')||'null')||seedStudents;
const save=()=>localStorage.setItem('kitebiStudents',JSON.stringify(students));
const $=s=>document.querySelector(s);
function render(){
  $('#studentCount').textContent=students.length;
  $('#studentTable').innerHTML=students.map(s=>`<tr><td>${esc(s.id)}</td><td>${esc(s.name)}</td><td>${esc(s.gender||'—')}</td><td>${esc(s.class||'—')}</td><td>${esc(s.stream||'—')}</td><td>${esc(s.year||'—')}</td></tr>`).join('');
  renderResults($('#searchInput')?.value||'');
}
function renderResults(q=''){
  const needle=q.trim().toLowerCase();
  const rows=students.filter(s=>!needle||[s.id,s.name,s.class,s.stream,s.guardian].some(v=>String(v||'').toLowerCase().includes(needle)));
  $('#results').innerHTML=rows.length?rows.map(s=>`<tr><td>${esc(s.id)}</td><td>${esc(s.name)}</td><td>${esc(s.class||'—')}</td><td>${esc(s.stream||'—')}</td><td>${esc(s.guardian||'—')}</td><td><span class="status">Active</span></td></tr>`).join(''):`<tr><td colspan="6">No matching records found.</td></tr>`;
}
function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function go(section){
  document.querySelectorAll('.section').forEach(x=>x.classList.remove('active-section'));
  const target=$('#'+section); if(target) target.classList.add('active-section');
  document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.section===section));
  $('#crumb').textContent=section.charAt(0).toUpperCase()+section.slice(1).replace('-', ' ');
  $('#sidebar').classList.remove('open'); window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>go(b.dataset.section)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));
$('#menu').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
$('#searchBtn').addEventListener('click',()=>renderResults($('#searchInput').value));
$('#searchInput').addEventListener('input',e=>renderResults(e.target.value));
$('#registrationForm').addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget));if(students.some(s=>s.id.toLowerCase()===d.id.toLowerCase())){toast('That Student ID already exists.');return}students.unshift({...d,year:Number(d.year)||2026});save();render();e.currentTarget.reset();toast('Student registered successfully.');go('students');});
function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)}
render();
