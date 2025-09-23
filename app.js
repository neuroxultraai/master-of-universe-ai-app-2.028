
const apiBase = window.__API_BASE__ || "http://localhost:5050";

function showPanel(id){
  document.querySelectorAll('.panel').forEach(p=>p.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
document.querySelectorAll('.nav button').forEach(b=> b.addEventListener('click', ()=> showPanel(b.dataset.target)));
showPanel('home');

async function callApi(path, payload){
  try{
    const res = await fetch(apiBase + path, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
    const j = await res.json();
    return j;
  }catch(e){
    return { error: e.message };
  }
}

// Chat simple (uses tutor endpoint as general chat)
document.getElementById('chatSend').addEventListener('click', async ()=>{
  const prompt = document.getElementById('chatPrompt').value;
  if(!prompt) return alert('Type a question');
  const r = await callApi('/api/tutor', { prompt });
  document.getElementById('chatOut').textContent = JSON.stringify(r, null, 2);
});

// Tutor
document.getElementById('tutorAsk').addEventListener('click', async ()=>{
  const topic = document.getElementById('tutorTopic').value;
  if(!topic) return alert('Enter topic');
  const r = await callApi('/api/tutor', { topic });
  document.getElementById('tutorOut').textContent = JSON.stringify(r, null, 2);
});

// Doctor
document.getElementById('docAsk').addEventListener('click', async ()=>{
  const symptoms = document.getElementById('docSymptoms').value;
  if(!symptoms) return alert('Describe symptoms');
  const r = await callApi('/api/doctor', { symptoms });
  document.getElementById('doctorOut').textContent = JSON.stringify(r, null, 2);
});

// Coding
document.getElementById('codeAsk').addEventListener('click', async ()=>{
  const prompt = document.getElementById('codePrompt').value;
  if(!prompt) return alert('Enter code task');
  const r = await callApi('/api/coding', { prompt });
  document.getElementById('codeOut').textContent = JSON.stringify(r, null, 2);
});

// Mentor
document.getElementById('mentorStart').addEventListener('click', async ()=>{
  const r = await callApi('/api/mentor', { intent: 'tip' });
  document.getElementById('mentorOut').textContent = JSON.stringify(r, null, 2);
});

// Designer
document.getElementById('designAsk').addEventListener('click', async ()=>{
  const prompt = document.getElementById('designPrompt').value;
  if(!prompt) return alert('Enter design prompt');
  const r = await callApi('/api/designer', { prompt });
  document.getElementById('designOut').textContent = JSON.stringify(r, null, 2);
});

// Business
document.getElementById('bizAsk').addEventListener('click', async ()=>{
  const prompt = document.getElementById('bizPrompt').value;
  if(!prompt) return alert('Enter business prompt');
  const r = await callApi('/api/business', { prompt });
  document.getElementById('bizOut').textContent = JSON.stringify(r, null, 2);
});

// Social
document.getElementById('socialAsk').addEventListener('click', async ()=>{
  const prompt = document.getElementById('socialPrompt').value;
  if(!prompt) return alert('Enter social prompt');
  const r = await callApi('/api/social', { prompt });
  document.getElementById('socialOut').textContent = JSON.stringify(r, null, 2);
});

// Camera coach simple demo: request webcam and draw a moving dot (placeholder for pose detection)
document.getElementById('startCamera').addEventListener('click', async ()=>{
  const video = document.getElementById('video');
  const overlay = document.getElementById('overlay');
  const ctx = overlay.getContext('2d');
  try{
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio:false });
    video.srcObject = stream;
    video.play();
    function loop(){ ctx.clearRect(0,0,overlay.width, overlay.height); ctx.fillStyle='rgba(107,92,255,0.9)'; ctx.beginPath(); ctx.arc(100 + (Math.sin(Date.now()/300)*50), 80, 8,0,Math.PI*2); ctx.fill(); requestAnimationFrame(loop); }
    loop();
    document.getElementById('cameraOut').textContent = 'Camera started (demo). Pose detection placeholder active.';
  }catch(e){ document.getElementById('cameraOut').textContent = 'Camera error: ' + e.message; }
});
