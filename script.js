const styleTag = document.createElement('style');
styleTag.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body, .wrapper {
    font-family: 'DM Sans', sans-serif !important;
    background: #0c0c0c !important;
    overflow: hidden;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 99px; }

  /* Sidebar slide animation */
  @keyframes slideIn {
    from { transform: translateX(-100%); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  .sidebar-open { animation: slideIn 0.22s cubic-bezier(.4,0,.2,1) forwards; }

  /* Message fade in */
  @keyframes msgIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .msg-in { animation: msgIn 0.25s ease forwards; }

  /* Typing dots */
  @keyframes dot-bounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
    40%            { transform: translateY(-5px); opacity: 1; }
  }
  .dot { animation: dot-bounce 1.2s infinite ease-in-out; }
  .dot:nth-child(2) { animation-delay: 0.15s; }
  .dot:nth-child(3) { animation-delay: 0.3s; }

  /* Input focus ring */
  .velora-input:focus { outline: none; }
  .input-wrap:focus-within { border-color: #3a3a3a !important; box-shadow: 0 0 0 3px rgba(255,255,255,0.04); }

  /* Modal backdrop blur */
  .modal-backdrop { backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }

  /* Prose styles for AI markdown */
  .ai-prose { line-height: 1.75; }
  .ai-prose h1 { font-size: 1.2em; font-weight: 600; margin: 1em 0 .4em; }
  .ai-prose h2 { font-size: 1.05em; font-weight: 600; margin: .9em 0 .35em; }
  .ai-prose h3 { font-size: .95em; font-weight: 600; margin: .8em 0 .3em; color: #aaa; }
  .ai-prose p  { margin-bottom: .65em; }
  .ai-prose ul, .ai-prose ol { padding-left: 1.4em; margin-bottom: .65em; }
  .ai-prose li { margin-bottom: .25em; font-size: .95em; }
  .ai-prose code {
    font-family: 'DM Mono', monospace;
    font-size: .82em;
    background: #1c1c1c;
    color: #e0e0e0;
    padding: 2px 6px;
    border-radius: 5px;
  }
  .ai-prose pre {
    background: #161616;
    border: 1px solid #252525;
    border-radius: 10px;
    padding: 14px 16px;
    overflow-x: auto;
    margin: .75em 0;
  }
  .ai-prose pre code { background: none; padding: 0; font-size: .82em; color: #ccc; }
  .ai-prose blockquote {
    border-left: 2px solid #333;
    padding-left: 14px;
    color: #777;
    margin: .65em 0;
  }
  .ai-prose strong { font-weight: 600; color: #f0f0f0; }
  .ai-prose a { color: #aaa; text-decoration: underline; }
  .ai-prose hr { border: none; border-top: 1px solid #222; margin: 1em 0; }
  .ai-prose table { width: 100%; border-collapse: collapse; font-size: .88em; margin: .65em 0; }
  .ai-prose th, .ai-prose td { padding: 7px 12px; border: 1px solid #252525; text-align: left; }
  .ai-prose th { background: #1a1a1a; font-weight: 600; }

  /* Navbar clean */
  .navbar {
    background: #0c0c0c !important;
    border-bottom: 1px solid #1a1a1a !important;
    height: 52px !important;
  }

  /* Message area */
  .message {
    background: #0c0c0c !important;
    height: calc(100vh - 52px - 76px) !important;
    padding: 24px 20px !important;
  }

  /* Input bar */
  .input-container { height: auto !important; position: static !important; }
`;
document.head.appendChild(styleTag);

const wrapper = document.querySelector('.wrapper');
wrapper.style.cssText = 'display:flex; flex-direction:column; height:100dvh; width:100vw; background:#0c0c0c; position:relative; overflow:hidden;';

const navbar = document.querySelector('.navbar');
navbar.style.cssText = 'display:flex; align-items:center; justify-content:space-between; padding:0 18px; height:52px; border-bottom:1px solid #1a1a1a; flex-shrink:0;';

const leftNav = document.querySelector('.left-nav');
leftNav.style.cssText = 'display:flex; align-items:center; gap:12px; height:100%;';

const menuIcon = document.querySelector('.menu');
menuIcon.style.cssText = 'font-size:20px; color:#666; cursor:pointer; transition:color .18s;';
menuIcon.onmouseenter = () => menuIcon.style.color = '#fff';
menuIcon.onmouseleave = () => menuIcon.style.color = '#666';

const brandEl = document.querySelector('.left-nav h1');
brandEl.style.cssText = 'font-size:16px; font-weight:600; color:#e8e8e8; letter-spacing:-.01em;';
brandEl.innerHTML = 'Velora <span style="color:#555">AI</span>';

const rightNav = document.querySelector('.right-nav');
rightNav.style.cssText = 'display:flex; align-items:center; height:100%;';

const loginBtn = document.querySelector('.right-nav button');
loginBtn.style.cssText = 'background:#1a1a1a; color:#ccc; border:1px solid #2a2a2a; padding:6px 18px; font-size:13px; font-weight:500; border-radius:8px; cursor:pointer; font-family:inherit; transition:all .18s;';
loginBtn.onmouseenter = () => { loginBtn.style.background='#222'; loginBtn.style.color='#fff'; };
loginBtn.onmouseleave = () => { loginBtn.style.background='#1a1a1a'; loginBtn.style.color='#ccc'; };


const message = document.querySelector('.message');
message.style.cssText = 'flex:1; overflow-y:auto; padding:28px 24px; display:flex; flex-direction:column; gap:6px; scroll-behavior:smooth;';
message.className = 'message';

const inputContainer = document.querySelector('.input-container');
inputContainer.style.cssText = 'flex-shrink:0; padding:10px 16px 14px; background:#0c0c0c; border-top:1px solid #1a1a1a; position:relative; height:auto;';
inputContainer.className = 'input-container';


const input = document.querySelector('.input');
input.style.cssText = 'position:static; width:100%; background:#141414; border:1px solid #232323; color:#e8e8e8; font-size:14px; font-family:inherit; padding:12px 52px 12px 44px; border-radius:12px; height:48px; transition:border-color .2s;';
input.className = 'input velora-input';

const inputWrap = document.createElement('div');
inputWrap.className = 'input-wrap';
inputWrap.style.cssText = 'position:relative; border-radius:12px;';
input.parentNode.insertBefore(inputWrap, input);
inputWrap.appendChild(input);

const addIcon = document.querySelector('.ri-add-large-fill');
addIcon.style.cssText = 'position:absolute; left:13px; top:50%; transform:translateY(-50%); font-size:18px; color:#555; cursor:pointer; z-index:5; transition:color .18s;';
addIcon.onmouseenter = () => addIcon.style.color = '#aaa';
addIcon.onmouseleave = () => addIcon.style.color = '#555';
inputWrap.appendChild(addIcon);


const sendBtn = document.querySelector('.sendBtn');
sendBtn.style.cssText = 'position:absolute; right:10px; top:50%; transform:translateY(-50%); width:30px; height:30px; background:#e8e8e8; border-radius:7px; display:flex; align-items:center; justify-content:center; font-size:15px; color:#0c0c0c; cursor:pointer; z-index:5; transition:opacity .18s;';
sendBtn.className = 'sendBtn';
sendBtn.innerHTML = '<i class="ri-send-ins-fill"></i>';
inputWrap.appendChild(sendBtn);

const sidebar = document.querySelector('.sidebar');
sidebar.style.cssText = 'position:fixed; top:0; left:0; width:280px; height:100vh; background:#0e0e0e; border-right:1px solid #1a1a1a; z-index:50; display:none; flex-direction:column; padding:20px 16px; gap:20px;';
sidebar.className = 'sidebar';

sidebar.innerHTML = `
  <div style="display:flex; align-items:center; justify-content:space-between;">
    <div style="display:flex; align-items:center; gap:10px;">
      <i class="ri-speak-fill" style="font-size:18px; color:#888;"></i>
      <span style="font-size:15px; font-weight:600; color:#e0e0e0;">Velora AI</span>
    </div>
    <i class="cross ri-close-line" style="font-size:20px; color:#555; cursor:pointer;" onmouseenter="this.style.color='#fff'" onmouseleave="this.style.color='#555'"></i>
  </div>
  <button id="newChatBtn" style="display:flex; align-items:center; gap:10px; background:#161616; border:1px solid #222; color:#888; font-size:13px; padding:9px 14px; border-radius:9px; cursor:pointer; font-family:inherit; transition:all .18s;" onmouseenter="this.style.borderColor='#3a3a3a';this.style.color='#fff';" onmouseleave="this.style.borderColor='#222';this.style.color='#888';">
    <i class="ri-add-line"></i> New Chat
  </button>
  <div style="display:flex; flex-direction:column; gap:8px; flex:1; overflow:hidden;">
    <p style="font-size:10px; text-transform:uppercase; letter-spacing:.1em; color:#333;">Recent</p>
    <ul id="historyList" style="display:flex; flex-direction:column; gap:2px; overflow-y:auto; flex:1;"></ul>
  </div>
`;


const overlay = document.createElement('div');
overlay.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,.55); z-index:49; display:none; backdrop-filter:blur(2px);';
wrapper.appendChild(overlay);

document.querySelector('.cross').addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

document.getElementById('newChatBtn').addEventListener('click', () => {
  communication = [];
  message.innerHTML = '';
  renderWelcome();
  closeSidebar();
});

menuIcon.addEventListener('click', openSidebar);

function openSidebar() {
  sidebar.style.display = 'flex';
  sidebar.classList.add('sidebar-open');
  overlay.style.display = 'block';
}
function closeSidebar() {
  sidebar.style.display = 'none';
  overlay.style.display = 'none';
}

let communication = [];
const sendMsg    = document.querySelector('.send-msg');
const receiveMsg = document.querySelector('.receive-msg');
const cont       = document.querySelector('.cont');
sendMsg.style.display    = 'none';
receiveMsg.style.display = 'none';
cont.style.display       = 'none';

const STORAGE_KEY = 'velora_chats';

function getChats() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveChat(text) {
  let chats = getChats().filter(c => c !== text);
  chats.unshift(text);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats.slice(0, 20)));
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById('historyList');
  if (!list) return;
  const chats = getChats();
  if (chats.length === 0) {
    list.innerHTML = `<li style="font-size:12px; color:#333; padding:6px 10px;">No chats yet</li>`;
    return;
  }
  list.innerHTML = chats.map(c => `
    <li style="font-size:13px; color:#555; padding:7px 10px; border-radius:7px; cursor:pointer; transition:all .15s; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;"
      title="${c}"
      onmouseenter="this.style.background='#181818';this.style.color='#ccc';"
      onmouseleave="this.style.background='transparent';this.style.color='#555';">
      ${c.length > 38 ? c.slice(0,38)+'…' : c}
    </li>
  `).join('');
}
renderHistory();

function renderWelcome() {
  const w = document.createElement('div');
  w.id = 'welcome';
  w.style.cssText = 'display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:10px;';

  w.innerHTML = `
    <p style="font-size:20px; font-weight:600; color:#d0d0d0; margin-bottom:14px;">How can I help you?</p>
    <button data-prompt="Create an image for me" class="cont-btn" style="display:flex; align-items:center; gap:16px; font-size:16px; color:#777; background:none; border:none; cursor:pointer; font-family:inherit; padding:4px 0; transition:color .15s;" onmouseenter="this.style.color='#e0e0e0'" onmouseleave="this.style.color='#777'">
      <i class="ri-image-ai-line" style="font-size:18px;"></i>Create an image
    </button>
    <button data-prompt="Help me write or edit something" class="cont-btn" style="display:flex; align-items:center; gap:16px; font-size:16px; color:#777; background:none; border:none; cursor:pointer; font-family:inherit; padding:4px 0; transition:color .15s;" onmouseenter="this.style.color='#e0e0e0'" onmouseleave="this.style.color='#777'">
      <i class="ri-pencil-ai-fill" style="font-size:18px;"></i>Write or edit
    </button>
    <button data-prompt="Look something up for me" class="cont-btn" style="display:flex; align-items:center; gap:16px; font-size:16px; color:#777; background:none; border:none; cursor:pointer; font-family:inherit; padding:4px 0; transition:color .15s;" onmouseenter="this.style.color='#e0e0e0'" onmouseleave="this.style.color='#777'">
      <i class="ri-global-line" style="font-size:18px;"></i>Look something up
    </button>
  `;
  message.appendChild(w);
}
renderWelcome();

message.addEventListener('click', e => {
  const btn = e.target.closest('.cont-btn');
  if (btn) { input.value = btn.dataset.prompt; handleSend(); }
});


const plusPopup = document.createElement('div');
plusPopup.style.cssText = 'position:absolute; bottom:70px; left:16px; background:#111; border:1px solid #222; border-radius:12px; padding:6px; display:none; flex-direction:column; gap:2px; z-index:30; min-width:200px; box-shadow:0 8px 32px rgba(0,0,0,.6);';
inputContainer.appendChild(plusPopup);
plusPopup.innerHTML = `
  <button data-prompt="Create an image for me" class="popup-btn" style="display:flex; align-items:center; gap:12px; font-size:14px; color:#aaa; background:none; border:none; padding:9px 12px; border-radius:8px; cursor:pointer; font-family:inherit; width:100%; text-align:left; transition:background .15s;" onmouseenter="this.style.background='#1a1a1a';this.style.color='#fff'" onmouseleave="this.style.background='none';this.style.color='#aaa'">
    <i class="ri-image-ai-line" style="color:#555;"></i>Create an image
  </button>
  <button data-prompt="Help me write or edit something" class="popup-btn" style="display:flex; align-items:center; gap:12px; font-size:14px; color:#aaa; background:none; border:none; padding:9px 12px; border-radius:8px; cursor:pointer; font-family:inherit; width:100%; text-align:left; transition:background .15s;" onmouseenter="this.style.background='#1a1a1a';this.style.color='#fff'" onmouseleave="this.style.background='none';this.style.color='#aaa'">
    <i class="ri-pencil-ai-fill" style="color:#555;"></i>Write or edit
  </button>
  <button data-prompt="Look something up for me" class="popup-btn" style="display:flex; align-items:center; gap:12px; font-size:14px; color:#aaa; background:none; border:none; padding:9px 12px; border-radius:8px; cursor:pointer; font-family:inherit; width:100%; text-align:left; transition:background .15s;" onmouseenter="this.style.background='#1a1a1a';this.style.color='#fff'" onmouseleave="this.style.background='none';this.style.color='#aaa'">
    <i class="ri-global-line" style="color:#555;"></i>Look something up
  </button>
`;

// Hidden file input
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*,.pdf,.doc,.docx,.txt';
fileInput.multiple = true;
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

addIcon.addEventListener('click', e => {
  e.stopPropagation();
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const files = Array.from(fileInput.files);
  if (files.length === 0) return;

  files.forEach(file => {
    const tag = document.createElement('div');
    tag.style.cssText = 'display:inline-flex; align-items:center; gap:6px; background:#1a1a1a; border:1px solid #2a2a2a; color:#aaa; font-size:12px; padding:4px 10px; border-radius:99px; margin:4px;';
    tag.innerHTML = `<i class="ri-file-line"></i> ${file.name} <i class="ri-close-line" style="cursor:pointer;" onclick="this.parentElement.remove()"></i>`;
    inputWrap.insertBefore(tag, input);
  });

  fileInput.value = '';
});

document.addEventListener('click', () => { plusPopup.style.display = 'none'; });
plusPopup.addEventListener('click', e => {
  e.stopPropagation();
  const btn = e.target.closest('.popup-btn');
  if (btn) { input.value = btn.dataset.prompt; plusPopup.style.display = 'none'; handleSend(); }
});


const loginModal = document.createElement('div');
loginModal.style.cssText = 'position:fixed; inset:0; display:none; align-items:center; justify-content:center; z-index:100; background:rgba(0,0,0,.7);';
loginModal.classList.add('modal-backdrop');
loginModal.innerHTML = `
  <div style="background:#0f0f0f; border:1px solid #1e1e1e; border-radius:16px; padding:32px 28px; width:90%; max-width:360px; display:flex; flex-direction:column; gap:20px; box-shadow:0 24px 60px rgba(0,0,0,.8);">
    <div style="display:flex; align-items:center; justify-content:space-between;">
      <span id="modalTitle" style="font-size:17px; font-weight:600; color:#e0e0e0;">Welcome back</span>
      <i id="closeModal" class="ri-close-line" style="font-size:20px; color:#555; cursor:pointer;" onmouseenter="this.style.color='#fff'" onmouseleave="this.style.color='#555'"></i>
    </div>
    <div style="display:flex; flex-direction:column; gap:10px;">
      <input id="loginEmail" type="email" placeholder="Email" style="background:#161616; border:1px solid #222; color:#e0e0e0; font-size:14px; padding:11px 14px; border-radius:9px; font-family:inherit; outline:none; transition:border-color .2s;" onfocus="this.style.borderColor='#3a3a3a'" onblur="this.style.borderColor='#222'" />
      <input id="loginPassword" type="password" placeholder="Password" style="background:#161616; border:1px solid #222; color:#e0e0e0; font-size:14px; padding:11px 14px; border-radius:9px; font-family:inherit; outline:none; transition:border-color .2s;" onfocus="this.style.borderColor='#3a3a3a'" onblur="this.style.borderColor='#222'" />
    </div>
    <button id="loginSubmit" style="background:#e8e8e8; color:#0c0c0c; font-size:14px; font-weight:600; padding:12px; border-radius:9px; border:none; cursor:pointer; font-family:inherit; transition:opacity .18s;" onmouseenter="this.style.opacity='.85'" onmouseleave="this.style.opacity='1'">Login</button>
    <p id="loginMsg" style="font-size:12px; text-align:center; display:none;"></p>
    <p style="font-size:12px; color:#444; text-align:center;">
      Don't have an account? <span id="switchSignup" style="color:#888; cursor:pointer; text-decoration:underline;" onmouseenter="this.style.color='#ccc'" onmouseleave="this.style.color='#888'">Sign up</span>
    </p>
  </div>
`;
document.body.appendChild(loginModal);

loginBtn.addEventListener('click', () => { loginModal.style.display = 'flex'; });
document.getElementById('closeModal').addEventListener('click', () => { loginModal.style.display = 'none'; });
loginModal.addEventListener('click', e => { if (e.target === loginModal) loginModal.style.display = 'none'; });

document.getElementById('switchSignup').addEventListener('click', () => {
  document.getElementById('modalTitle').textContent = 'Create account';
  document.getElementById('loginSubmit').textContent = 'Sign up';
});

document.getElementById('loginSubmit').addEventListener('click', async () => {
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const msg      = document.getElementById('loginMsg');
  const btn      = document.getElementById('loginSubmit');

  if (!email || !password) {
    msg.textContent = 'Please fill in all fields.';
    msg.style.color = '#e05555';
    msg.style.display = 'block';
    return;
  }

  btn.textContent = 'Please wait...';
  btn.disabled = true;

  await new Promise(r => setTimeout(r, 1000));

  msg.textContent = '✓ Logged in successfully';
  msg.style.color = '#5c9e6e';
  msg.style.display = 'block';
  loginBtn.textContent = email.split('@')[0];

  setTimeout(() => {
    loginModal.style.display = 'none';
    btn.textContent = 'Login';
    btn.disabled = false;
    msg.style.display = 'none';
  }, 900);
});


sendBtn.addEventListener('click', handleSend);
input.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(); });

async function handleSend() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  const welcome = document.getElementById('welcome');
  if (welcome) welcome.remove();

  communication.push(userMessage);
  input.value = '';

  showUserMessage(userMessage);
  saveChat(userMessage);
  showTyping();
  await getResponse(userMessage);
}

function showUserMessage(text) {
  const div = document.createElement('div');
  div.className = 'msg-in';
  div.style.cssText = 'display:flex; flex-direction:column; align-items:flex-end; margin-bottom:18px;';
  div.innerHTML = `
    <div style="background:#161616; border:1px solid #1e1e1e; color:#e0e0e0; padding:10px 16px; border-radius:18px 18px 4px 18px; font-size:14px; max-width:72%; line-height:1.6; word-break:break-word;">${escapeHtml(text)}</div>
    <div style="display:flex; gap:10px; padding:5px 4px; margin-top:2px;">
      <i class="ri-file-copy-line" style="font-size:13px; color:#333; cursor:pointer; transition:color .15s;" onmouseenter="this.style.color='#888'" onmouseleave="this.style.color='#333'" onclick="copyText(${JSON.stringify(text)})"></i>
      <i class="ri-pencil-fill" style="font-size:13px; color:#333; cursor:pointer; transition:color .15s;" onmouseenter="this.style.color='#888'" onmouseleave="this.style.color='#333'"></i>
    </div>
  `;
  message.appendChild(div);
  message.scrollTop = message.scrollHeight;
}

function showTyping() {
  const div = document.createElement('div');
  div.id = 'typing';
  div.style.cssText = 'display:flex; align-items:center; gap:5px; margin-bottom:18px; padding:2px 0;';
  div.innerHTML = `
    <span class="dot" style="width:6px;height:6px;background:#3a3a3a;border-radius:50%;display:inline-block;"></span>
    <span class="dot" style="width:6px;height:6px;background:#3a3a3a;border-radius:50%;display:inline-block;"></span>
    <span class="dot" style="width:6px;height:6px;background:#3a3a3a;border-radius:50%;display:inline-block;"></span>
  `;
  message.appendChild(div);
  message.scrollTop = message.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typing');
  if (t) t.remove();
}

function showReceiveMessage(text) {
  removeTyping();
  const div = document.createElement('div');
  div.className = 'msg-in';
  div.style.cssText = 'display:flex; flex-direction:column; align-items:flex-start; margin-bottom:18px; max-width:100%;';

  const rendered = typeof marked !== 'undefined' ? marked.parse(text) : escapeHtml(text).replace(/\n/g,'<br>');

  div.innerHTML = `
    <div class="ai-prose" style="color:#c8c8c8; font-size:14px; width:100%; max-width:680px;">${rendered}</div>
    <div style="display:flex; gap:10px; padding:5px 2px; margin-top:4px;">
      <i class="ri-file-copy-line" style="font-size:13px; color:#333; cursor:pointer; transition:color .15s;" onmouseenter="this.style.color='#888'" onmouseleave="this.style.color='#333'" onclick="copyText(${JSON.stringify(text)})"></i>
      <i class="ri-thumb-up-line" style="font-size:13px; color:#333; cursor:pointer; transition:color .15s;" onmouseenter="this.style.color='#888'" onmouseleave="this.style.color='#333'"></i>
      <i class="ri-thumb-down-line" style="font-size:13px; color:#333; cursor:pointer; transition:color .15s;" onmouseenter="this.style.color='#888'" onmouseleave="this.style.color='#333'"></i>
      <i class="ri-upload-2-fill" style="font-size:13px; color:#333; cursor:pointer; transition:color .15s;" onmouseenter="this.style.color='#888'" onmouseleave="this.style.color='#333'"></i>
      <i class="ri-loop-right-line" style="font-size:13px; color:#333; cursor:pointer; transition:color .15s;" onmouseenter="this.style.color='#888'" onmouseleave="this.style.color='#333'"></i>
      <i class="ri-more-line" style="font-size:13px; color:#333; cursor:pointer; transition:color .15s;" onmouseenter="this.style.color='#888'" onmouseleave="this.style.color='#333'"></i>
    </div>
  `;
  message.appendChild(div);
  message.scrollTop = message.scrollHeight;
}

function cleanText(text) { return text; }

async function getResponse(userMessage) {
  try {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }]
      })
    });
    const data = await res.json();
    const aiText = data.candidates[0].content.parts[0].text;
    showReceiveMessage(cleanText(aiText));
  } catch (err) {
    showReceiveMessage('Error: ' + err.message);
  }
}

function escapeHtml(t) {
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    const flash = document.createElement('div');
    flash.style.cssText = 'position:fixed; bottom:85px; left:50%; transform:translateX(-50%); background:#1a1a1a; border:1px solid #2a2a2a; color:#ccc; font-size:12px; padding:6px 16px; border-radius:99px; z-index:99; font-family:inherit;';
    flash.textContent = 'Copied';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 1600);
  });
}