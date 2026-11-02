/* ===================================================================
   LandscapesUSA — Interactive Application Logic
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mouse Radial Glow Effect
  const mouseGlow = document.getElementById('mouseGlow');
  if (mouseGlow) {
    window.addEventListener('mousemove', (e) => {
      mouseGlow.style.left = `${e.clientX}px`;
      mouseGlow.style.top = `${e.clientY}px`;
    });
  }

  // 2. Navbar Scroll Effects & Progress Bar
  const navbar = document.getElementById('navbar');
  const scrollProgressBar = document.getElementById('scrollProgressBar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // 3. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      menuToggle.innerHTML = isOpen ? '&times;' : '&#9776;';
    });

    // Close on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.innerHTML = '&#9776;';
      });
    });
  }

  // 4. "The LandscapesUSA Standard" Interactive Tabs (Fixing legacy jQuery text fade weakness)
  const standardTabs = document.querySelectorAll('.tab-btn');
  const panelTitle = document.getElementById('panelTitle');
  const panelDesc = document.getElementById('panelDesc');
  const panelBullets = document.getElementById('panelBullets');

  const standardData = {
    updates: {
      title: "Never Left Wondering — Proactive Client Portal",
      desc: "Legacy landscaping companies only speak to you when something goes wrong or when you have to chase them down. LandscapesUSA provides scheduled photographic site audits, direct manager access, and weather incident reports before you have to ask.",
      bullets: [
        "Time-stamped photographic inspection logs",
        "Direct text & phone line to regional partner",
        "Clear 48-hour issue resolution guarantees",
        "Pre-event grounds readiness verification"
      ]
    },
    management: {
      title: "Zero Loose Ends Passed Back to You",
      desc: "Our partner-led structure ensures that every detail—from micro-drip irrigation audits to tree canopy clearance and fertilization schedules—is handled autonomously by senior field specialists without cluttering your inbox.",
      bullets: [
        "Single point of contact for multi-property portfolios",
        "Proactive irrigation repairs before fines or brownouts",
        "Full seasonal floral and mulch transitions planned ahead",
        "Quiet commercial battery-powered equipment available"
      ]
    },
    impressions: {
      title: "Grounds That Command Respect 365 Days a Year",
      desc: "First impressions set the valuation of commercial campuses and executive residential communities. Our architectural landscape lighting, geometric turf lines, and crisp stonework reflect premier pride of ownership.",
      bullets: [
        "Surgical edge trimming & geometric grass striping",
        "Warm low-voltage architectural nightscape lighting",
        "Lush perennial color rotations tailored to local soil",
        "Weed-free gravel, paver, and hardscape beds"
      ]
    },
    accountability: {
      title: "If Something Isn't Right, We Own It Immediately",
      desc: "Because our regional leaders are equity owners in their branches (such as JBK in Denver, Peachtree in Nashville, Elements in Austin), accountability is personal. No corporate runaround, no excuses, just decisive action.",
      bullets: [
        "On-site manager review within 24 hours of notification",
        "Local nursery sourcing for rapid plant replacements",
        "Quarterly executive property walk with clients",
        "Contract backed by 20+ year national reputation"
      ]
    }
  };

  standardTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      standardTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const key = tab.getAttribute('data-tab');
      const data = standardData[key];

      if (data && panelTitle && panelDesc && panelBullets) {
        panelTitle.textContent = data.title;
        panelDesc.textContent = data.desc;
        panelBullets.innerHTML = data.bullets.map(b => `
          <li class="panel-bullet">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${b}</span>
          </li>
        `).join('');
      }
    });
  });

  // 5. Portfolio Gallery Filter & Lightbox
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxSpecs = document.getElementById('lightboxSpecs');
  const lightboxClose = document.getElementById('lightboxClose');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox click
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      const title = item.querySelector('.gallery-title').textContent;
      const cat = item.querySelector('.gallery-cat').textContent;
      const specs = item.querySelector('.gallery-specs').textContent;

      if (lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxTitle.textContent = title;
        lightboxCategory.textContent = cat;
        lightboxSpecs.textContent = specs;
        lightboxModal.classList.add('active');
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // 6. Interactive Scope & Cost Estimator
  const acreageBtns = document.querySelectorAll('[data-acreage]');
  const propertyTypeBtns = document.querySelectorAll('[data-proptype]');
  const checkItems = document.querySelectorAll('.check-item');
  const estTotalVal = document.getElementById('estTotalVal');
  const estCrewVal = document.getElementById('estCrewVal');
  const estVisitsVal = document.getElementById('estVisitsVal');
  const estScopeVal = document.getElementById('estScopeVal');

  let selectedAcreage = 1; // 1 = 1-5, 2 = 5-15, 3 = 15+
  let selectedPropType = 1; // 1 = HOA, 2 = Commercial, 3 = Hospitality
  let selectedServicesCost = 1200;

  function updateEstimator() {
    let baseRate = 1800;

    if (selectedAcreage === 1) baseRate = 2200;
    else if (selectedAcreage === 2) baseRate = 4800;
    else if (selectedAcreage === 3) baseRate = 9600;

    let propMultiplier = 1.0;
    if (selectedPropType === 1) propMultiplier = 1.0;
    else if (selectedPropType === 2) propMultiplier = 1.25;
    else if (selectedPropType === 3) propMultiplier = 1.45;

    let total = Math.round((baseRate * propMultiplier) + selectedServicesCost);

    let crewSize = "4-6 Specialists";
    if (selectedAcreage === 1) crewSize = "3-4 Dedicated Crew";
    else if (selectedAcreage === 2) crewSize = "5-8 Dedicated Crew";
    else if (selectedAcreage === 3) crewSize = "10+ On-Site Team";

    let visits = selectedPropType === 3 ? "2x Weekly Full Cycle" : "Weekly Scheduled Maintenance";

    if (estTotalVal) estTotalVal.textContent = `$${total.toLocaleString()} / mo`;
    if (estCrewVal) estCrewVal.textContent = crewSize;
    if (estVisitsVal) estVisitsVal.textContent = visits;
  }

  acreageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      acreageBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAcreage = parseInt(btn.getAttribute('data-acreage'), 10);
      updateEstimator();
    });
  });

  propertyTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      propertyTypeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedPropType = parseInt(btn.getAttribute('data-proptype'), 10);
      updateEstimator();
    });
  });

  checkItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      const input = item.querySelector('input');
      if (input) input.checked = item.classList.contains('checked');

      // Calculate checked sum
      let sum = 0;
      document.querySelectorAll('.check-item.checked').forEach(c => {
        sum += parseInt(c.getAttribute('data-cost') || 0, 10);
      });
      selectedServicesCost = sum;
      updateEstimator();
    });
  });

  updateEstimator();

  // 7. Interactive 11-Market Location Cards
  const locCards = document.querySelectorAll('.loc-card');
  const locSelectedNotice = document.getElementById('locSelectedNotice');

  locCards.forEach(card => {
    card.addEventListener('click', () => {
      locCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const city = card.querySelector('.loc-city').textContent;
      const partner = card.querySelector('.loc-partner').textContent;
      if (locSelectedNotice) {
        locSelectedNotice.innerHTML = `Selected Market: <strong>${city}</strong> &mdash; Branch: <em>${partner}</em>. Local dispatch ready.`;
      }
    });
  });

  // 8. Scroll Reveal Animations
  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 9. Interactive Contact Form Submission Feedback
  const quoteForm = document.getElementById('quoteForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = quoteForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg> Dispatching Request...
      `;

      setTimeout(() => {
        quoteForm.reset();
        btn.disabled = false;
        btn.innerHTML = originalText;
        if (formSuccessAlert) {
          formSuccessAlert.style.display = 'block';
          setTimeout(() => {
            formSuccessAlert.style.display = 'none';
          }, 6000);
        }
      }, 1200);
    });
  }

  // 10. Emerald AI Chat Widget System (Connected to Local n8n Agent with Live HubSpot CRM Tool)
  const N8N_CHAT_WEBHOOK_URL = 'http://localhost:5678/webhook/7675966b-5b85-4ebf-b360-1482728bd460/chat';
  const chatWidget = document.getElementById('chatWidget');
  const chatToggleBtn = document.getElementById('chatToggleBtn');
  const chatWindow = document.getElementById('chatWindow');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatResetBtn = document.getElementById('chatResetBtn');
  const chatMessages = document.getElementById('chatMessages');
  const chatInputForm = document.getElementById('chatInputForm');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatTypingIndicator = document.getElementById('chatTypingIndicator');

  // Storage keys
  const CHAT_SESSION_KEY = 'emerald_landscape_chat_session';
  const CHAT_HISTORY_KEY = 'emerald_landscape_chat_history';

  // Session ID manager
  function getChatSessionId() {
    let sid = localStorage.getItem(CHAT_SESSION_KEY);
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem(CHAT_SESSION_KEY, sid);
    }
    return sid;
  }

  let chatSessionId = getChatSessionId();

  // Chat History Storage helpers
  function getStoredChatHistory() {
    try {
      const stored = localStorage.getItem(CHAT_HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn('Failed to parse chat history:', e);
      return [];
    }
  }

  function saveChatMessageToStorage(role, content, timeStr) {
    try {
      const history = getStoredChatHistory();
      history.push({ role, content, time: timeStr, timestamp: Date.now() });
      if (history.length > 60) history.shift();
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save chat message:', e);
    }
  }

  function clearStoredChatHistory() {
    localStorage.removeItem(CHAT_HISTORY_KEY);
    localStorage.removeItem(CHAT_SESSION_KEY);
    chatSessionId = getChatSessionId();
  }

  // Format simple markdown into HTML
  function formatMarkdown(text) {
    if (!text) return '';
    let escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Bold **text**
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Bullet lists (* item or - item)
    const lines = escaped.split('\n');
    let formattedLines = [];
    let inList = false;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        if (!inList) {
          formattedLines.push('<ul>');
          inList = true;
        }
        formattedLines.push(`<li>${trimmed.substring(2)}</li>`);
      } else {
        if (inList) {
          formattedLines.push('</ul>');
          inList = false;
        }
        if (trimmed.length > 0) {
          formattedLines.push(`<p>${line}</p>`);
        }
      }
    });

    if (inList) {
      formattedLines.push('</ul>');
    }

    return formattedLines.join('');
  }

  function scrollChatToBottom() {
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  function appendChatMessage(role, content, customTime, saveToStorage = true) {
    if (!chatMessages) return;

    const timeStr = customTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg chat-msg-${role}`;

    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'chat-msg-bubble';

    if (role === 'bot') {
      bubbleDiv.innerHTML = formatMarkdown(content);
    } else {
      bubbleDiv.textContent = content;
    }

    const timeSpan = document.createElement('span');
    timeSpan.className = 'chat-msg-time';
    timeSpan.textContent = timeStr;

    msgDiv.appendChild(bubbleDiv);
    msgDiv.appendChild(timeSpan);
    chatMessages.appendChild(msgDiv);
    scrollChatToBottom();

    if (saveToStorage) {
      saveChatMessageToStorage(role, content, timeStr);
    }
  }

  // Load chat history from storage on page startup
  function loadChatHistory() {
    const history = getStoredChatHistory();
    if (!history || history.length === 0 || !chatMessages) return;

    const divider = document.createElement('div');
    divider.className = 'chat-history-divider';
    divider.innerHTML = '<span>Previous Chat History</span>';
    chatMessages.appendChild(divider);

    history.forEach(item => {
      appendChatMessage(item.role, item.content, item.time, false);
    });
    scrollChatToBottom();
  }

  // Initialize previous history if any
  loadChatHistory();

  // Toggle chat widget open/close
  if (chatToggleBtn && chatWidget) {
    chatToggleBtn.addEventListener('click', () => {
      const isActive = chatWidget.classList.toggle('active');
      chatToggleBtn.setAttribute('aria-expanded', isActive);
      if (chatWindow) {
        chatWindow.setAttribute('aria-hidden', !isActive);
      }
      if (isActive && chatInput) {
        setTimeout(() => chatInput.focus(), 250);
      }
    });
  }

  if (chatCloseBtn && chatWidget) {
    chatCloseBtn.addEventListener('click', () => {
      chatWidget.classList.remove('active');
      if (chatWindow) {
        chatWindow.setAttribute('aria-hidden', 'true');
      }
      if (chatToggleBtn) {
        chatToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Reset conversation
  if (chatResetBtn) {
    chatResetBtn.addEventListener('click', () => {
      if (confirm('Start a fresh conversation? This will clear previous chat history.')) {
        clearStoredChatHistory();
        if (chatMessages) {
          chatMessages.innerHTML = `
            <div class="chat-msg chat-msg-bot">
              <div class="chat-msg-bubble">
                <p><strong>Conversation refreshed! 🌿</strong></p>
                <p>How can our landscape architecture team help you today?</p>
                <div class="chat-quick-chips">
                  <button type="button" class="chip-btn" data-query="What commercial landscaping services do you provide?">🌿 Commercial Grounds</button>
                  <button type="button" class="chip-btn" data-query="Tell me about your architectural hardscaping and patios.">🧱 Hardscape & Patios</button>
                  <button type="button" class="chip-btn" data-query="How does your nightscape lighting design work?">💡 Nightscape Lighting</button>
                  <button type="button" class="chip-btn" data-query="I'd like to get an estimate for my property.">💵 Request Estimate</button>
                </div>
              </div>
              <span class="chat-msg-time">Just now</span>
            </div>
          `;
        }
      }
    });
  }

  // Chip buttons click delegation
  if (chatMessages) {
    chatMessages.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip-btn');
      if (chip && chip.dataset.query) {
        const query = chip.dataset.query;
        handleSendMessage(query);
      }
    });
  }

  // Send message handler
  async function handleSendMessage(text) {
    const query = (text || (chatInput ? chatInput.value : '')).trim();
    if (!query) return;

    if (chatInput) {
      chatInput.value = '';
    }

    appendChatMessage('user', query);

    // Show typing indicator & disable button
    if (chatTypingIndicator) {
      chatTypingIndicator.style.display = 'flex';
      scrollChatToBottom();
    }
    if (chatSendBtn) {
      chatSendBtn.disabled = true;
    }

    try {
      const response = await fetch(N8N_CHAT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chatInput: query,
          sessionId: chatSessionId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const botReply = data.output || data.text || (typeof data === 'string' ? data : JSON.stringify(data));
      appendChatMessage('bot', botReply);
    } catch (err) {
      console.warn('n8n Chat Request Error:', err);
      appendChatMessage('bot', `⚠️ **Could not connect to the local n8n Chat Agent.**\n\n* Make sure n8n is running locally at \`http://localhost:5678\`.\n* Or call our direct operations desk at **(800) 555-LUSA** for immediate assistance.`);
    } finally {
      if (chatTypingIndicator) {
        chatTypingIndicator.style.display = 'none';
      }
      if (chatSendBtn) {
        chatSendBtn.disabled = false;
      }
      if (chatInput) {
        chatInput.focus();
      }
    }
  }

  // Form submit handler
  if (chatInputForm) {
    chatInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSendMessage();
    });
  }
});
