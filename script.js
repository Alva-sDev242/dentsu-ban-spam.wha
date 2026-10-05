// ========== LIENS OFFICIELS ==========
const LINKS = {
    WHATSAPP: 'https://whatsapp.com/channel/0029VbBidXg6BIEm6AM3FA0K',
    TELEGRAM: 'https://t.me/xizlegion',
    OWNER: 'https://t.me/Natsu_or_Dentsu'
};

// ========== GESTION UID LIÉ AU TÉLÉPHONE (APPAREIL) ==========
const STORAGE_KEY = 'dentsu_device_uid';

function getDeviceFingerprint() {
    const screen = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;
    const platform = navigator.platform;
    const hardwareConcurrency = navigator.hardwareConcurrency || 'unknown';
    const deviceMemory = navigator.deviceMemory || 'unknown';
    const fingerprint = `${screen}|${timezone}|${language}|${platform}|${hardwareConcurrency}|${deviceMemory}`;
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
        const char = fingerprint.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString();
}

function generateUIDFromDevice() {
    const deviceFingerprint = getDeviceFingerprint();
    const timestamp = Date.now().toString().slice(-4);
    let combined = deviceFingerprint + timestamp;
    let numericUID = '';
    for (let i = 0; i < combined.length && numericUID.length < 10; i++) {
        const code = combined.charCodeAt(i);
        numericUID += (code % 10).toString();
    }
    while (numericUID.length < 10) {
        numericUID += Math.floor(Math.random() * 10).toString();
    }
    return numericUID.slice(0, 10);
}

function getDeviceUID() {
    let uid = sessionStorage.getItem(STORAGE_KEY);
    if (uid) return uid;
    uid = localStorage.getItem(STORAGE_KEY);
    if (uid) {
        sessionStorage.setItem(STORAGE_KEY, uid);
        return uid;
    }
    uid = generateUIDFromDevice();
    localStorage.setItem(STORAGE_KEY, uid);
    sessionStorage.setItem(STORAGE_KEY, uid);
    return uid;
}

// ========== 37 EMAILS ACTIFS WHATSAPP & META ==========
const REPORT_EMAILS = [
    // WhatsApp Core
    'support@whatsapp.com',
    'android@support.whatsapp.com',
    'iphone@support.whatsapp.com',
    'webclient@support.whatsapp.com',
    'business@support.whatsapp.com',
    'business@whatsapp.com',
    'enterprise@whatsapp.com',
    
    // Meta Core
    'abuse@fb.com',
    'phish@fb.com',
    'security@facebookmail.com',
    'integrity@fb.com',
    'safety@fb.com',
    'appeals@fb.com',
    'platformcs@support.facebook.com',
    'datarequests@support.facebook.com',
    
    // Meta Juridique
    'legal@fb.com',
    'lawenforcement@fb.com',
    'records@fb.com',
    'press@fb.com',
    'emergency@fb.com',
    
    // WhatsApp Régionaux
    'europe@support.whatsapp.com',
    'uk@support.whatsapp.com',
    'germany@support.whatsapp.com',
    'france@support.whatsapp.com',
    'spain@support.whatsapp.com',
    'italy@support.whatsapp.com',
    'netherlands@support.whatsapp.com',
    'belgium@support.whatsapp.com',
    'switzerland@support.whatsapp.com',
    'canada@support.whatsapp.com',
    'australia@support.whatsapp.com',
    
    // WhatsApp Spécifiques
    'privacy@whatsapp.com',
    'legal@whatsapp.com',
    'dmca@whatsapp.com',
    'trustandsafety@whatsapp.com',
    'report@whatsapp.com',
    'terrorism@whatsapp.com',
    'childsafety@whatsapp.com'
];

const WHATSAPP_ENDPOINTS = [
    'https://www.whatsapp.com/contact/user_report/',
    'https://faq.whatsapp.com/contact/user_report/',
    'https://support.whatsapp.com/contact/user_report/'
];

// ========== RAPPORTS ULTRA STRICTS ==========
const REPORT_TEMPLATES = {
    ABUSE: {
        subject: "🚨 URGENT: TERRORISM + CSAM + EXTREME VIOLENCE - CRIMINAL REFERRAL 🚨",
        body: `╔══════════════════════════════════════════════════════════════════════════╗
║   URGENT CRIMINAL REFERRAL - LAW ENFORCEMENT IMMEDIATELY NOTIFIED   ║
╚══════════════════════════════════════════════════════════════════════════╝

[PRIORITY: MAXIMUM - ESCALATE TO TRUST & SAFETY TEAM WITHIN 1 HOUR]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 TERRORIST ACTIVITIES (18 U.S.C. § 2339B):

This account is actively engaged in material support to designated terrorist organizations:

• Sharing detailed instructions for manufacturing explosive devices (IEDs) including:
  - TATP (triacetone triperoxide) synthesis
  - Pipe bomb construction guides
  - Vehicle-borne improvised explosive device (VBIED) methodology

• Distributing official terrorist propaganda videos from:
  - ISIS (Islamic State) central media outlets
  - Al-Qaeda affiliated networks (Al-Shabaab, Al-Nusra)
  - HTS (Hayat Tahrir al-Sham) recruitment materials

• Recruiting vulnerable individuals for extremist causes through:
  - Grooming conversations (ages 14-25)
  - Dark web referrals and encrypted channel invitations
  - Financial incentives for radicalization

• Coordinating with known terrorist networks across Telegram, Discord, and Signal

🔞 CHILD SEXUAL ABUSE MATERIAL (CSAM) - FEDERAL CRIME (18 U.S.C. § 2252):

• Explicit material involving minors under 13 years old (Category A content)
• Grooming conversations with underage users (ages 11-16)
• Links to encrypted CSAM repositories on dark web (Tor, I2P)
• Operating within known pedophile networks (linked to 3 confirmed NCMEC cases)

💀 EXTREME VIOLENCE & GORE CONTENT:

• Beheading videos (6+ distinct videos shared)
• Torture footage and execution recordings (ISIS-style productions)
• Animal cruelty and mutilation content (violating 18 U.S.C. § 48)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 IMMEDIATE ACTION REQUIRED:
1. PERMANENT ACCOUNT TERMINATION (within 24 hours)
2. PRESERVE ALL MESSAGE LOGS FOR LAW ENFORCEMENT (legal hold)
3. NOTIFY NATIONAL CYBERCRIME UNITS (Europol/FBI/Interpol)
4. REPORT TO NCMEC (mandatory under US law)

Report ID: WA-ABUSE-{{RANDOM}}
Reporter UID: {{UID}}
Timestamp: {{FULLDATE}}

⚠️ I AFFIRM UNDER PENALTY OF PERJURY (18 U.S.C. § 1621) THAT ALL INFORMATION IS TRUE AND ACCURATE.`
    },
    SCAM: {
        subject: "🔴 INTERNATIONAL ORGANIZED CRIME RING - MONEY LAUNDERING + WIRE FRAUD 🔴",
        body: `╔══════════════════════════════════════════════════════════════════════════╗
║   INTERNATIONAL FINANCIAL CRIME - EUROPOL EC3 NOTIFIED   ║
╚══════════════════════════════════════════════════════════════════════════╝

WhatsApp Account: {{PHONE}}
Criminal Organization: "SHADOW FINANCE" / "DARK MARKETS"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 FINANCIAL FRAUD & BANK IMPERSONATION (18 U.S.C. § 1343):

• Impersonating major banks (Crédit Agricole, BNP Paribas, Société Générale, HSBC)
• Phishing campaigns targeting elderly customers (65+ demographic)
• Investment scams promising 300% returns in cryptocurrency
• Romance scams defrauding victims of €50,000+

📊 VICTIM IMPACT:
• 127+ verified victims across France, Belgium, Switzerland, Canada
• Estimated financial loss: €2,300,000+ (verified cases only)
• Elderly victims (65+): 34 individuals, average loss €32,000

💳 IDENTITY THEFT (18 U.S.C. § 1028):
• Stolen credit card information trading (500+ cards compromised)
• Passport and ID document forgery services advertised

🌐 MONEY LAUNDERING (18 U.S.C. § 1956):
• Cryptocurrency mixing services promoted
• Estimated monthly volume: €850,000+ through 47 coordinated accounts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 URGENT ACTION REQUIRED:
1. IMMEDIATE ACCOUNT FREEZE (preserve evidence)
2. COORDINATE WITH EUROPOL FINANCIAL CRIME UNIT (EC3)
3. NOTIFY FIU (Financial Intelligence Units) across EU

Report ID: WA-SCAM-{{RANDOM}}
Reporter UID: {{UID}}
Timestamp: {{FULLDATE}}

⚠️ This account is part of an active criminal investigation. WhatsApp is REQUIRED to preserve evidence under EU Directive 2019/713.`
    },
    SPAM: {
        subject: "⚠️ MASS SPAM BOTNET - PLATFORM INFRASTRUCTURE ATTACK ⚠️",
        body: `╔══════════════════════════════════════════════════════════════════════════╗
║   PLATFORM INTEGRITY THREAT - AUTOMATED BOTNET ATTACK IN PROGRESS   ║
╚══════════════════════════════════════════════════════════════════════════╝

WhatsApp Account: {{PHONE}}
Botnet Network Size: 47+ coordinated accounts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🤖 BOTNET CHARACTERISTICS:
• Message Volume: 12,500+ messages in 72 hours
• Sending Pattern: Automated script (47ms intervals)
• Message Duplication Rate: 94% identical content
• Coordinated Accounts: 47+ accounts in synchronized pattern

📊 FORENSIC ANALYSIS:
• Average Response Time: 0.3 seconds (inhuman)
• IP Rotation: 200+ unique IPs across 30 countries
• Device Fingerprint: Virtualized Android environment

🎯 SPAM CATEGORIES:
| Category | Volume | Target |
|----------|--------|--------|
| Phishing Links | 3,200+ | Bank credential harvesting |
| Illegal Products | 2,800+ | Counterfeit goods, drugs |
| Crypto Scams | 1,800+ | Fake investment platforms |

📈 PLATFORM IMPACT:
• User Complaints: 340+ in last 24 hours
• Groups Infiltrated: 87+ public groups
• Network Growth Rate: +23 accounts per day

🚨 VIOLATIONS:
• WhatsApp ToS Section 4 (Mass Spam)
• Section 5 (Automated Access)
• CFAA 18 U.S.C. § 1030

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 IMMEDIATE ACTION REQUIRED:
1. PERMANENT ACCOUNT TERMINATION (+ 47 associated accounts)
2. IP RANGE BLOCKING (200+ IPs identified)
3. DEVICE FINGERPRINT BLACKLIST

Report ID: WA-SPAM-{{RANDOM}}
Reporter UID: {{UID}}
Timestamp: {{FULLDATE}}

⚠️ This is an active infrastructure attack requiring immediate manual intervention.`
    }
};

// ========== FONCTIONS ==========
function generateRandomId() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

function getFullTimestamp() {
    return new Date().toISOString();
}

function formatPhoneForReport(phone) {
    let clean = phone.replace(/[^0-9+]/g, '');
    if (!clean.startsWith('+')) {
        clean = '+' + clean;
    }
    return clean;
}

async function sendEmailReports(targetPhone, type, uid) {
    const template = REPORT_TEMPLATES[type];
    const phone = formatPhoneForReport(targetPhone);
    const randomId = generateRandomId();
    const fullDate = getFullTimestamp();
    
    let body = template.body
        .replace(/{{PHONE}}/g, phone)
        .replace(/{{RANDOM}}/g, randomId)
        .replace(/{{FULLDATE}}/g, fullDate)
        .replace(/{{UID}}/g, uid);
    
    const mailtoLink = `mailto:${REPORT_EMAILS[0]}?cc=${REPORT_EMAILS.slice(1).join(',')}&subject=${encodeURIComponent(template.subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
    return true;
}

async function sendWebReports(targetPhone, type, uid) {
    const phone = formatPhoneForReport(targetPhone);
    const template = REPORT_TEMPLATES[type];
    const randomId = generateRandomId();
    const email = `witness_${generateRandomId().toLowerCase()}@protonmail.com`;
    
    let body = template.body
        .replace(/{{PHONE}}/g, phone)
        .replace(/{{RANDOM}}/g, randomId)
        .replace(/{{FULLDATE}}/g, getFullTimestamp())
        .replace(/{{UID}}/g, uid);
    
    for (const url of WHATSAPP_ENDPOINTS) {
        try {
            const formData = new FormData();
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('subject', template.subject);
            formData.append('message', body);
            formData.append('type', type.toLowerCase());
            formData.append('consent', 'true');
            formData.append('priority', 'MAXIMUM');
            formData.append('reporter_uid', uid);
            
            await fetch(url, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });
        } catch(e) {}
    }
    return true;
}

// ========== INTERFACE ==========
let selectedType = null;
let activeToastTimeout = null;
let currentUid = '';

function showToast(message, duration = 15000) {
    if (activeToastTimeout) clearTimeout(activeToastTimeout);
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    activeToastTimeout = setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            if (toast.parentNode) toast.remove();
        }, 300);
        activeToastTimeout = null;
    }, duration);
}

function disappearPhoneNumber() {
    const wrapper = document.getElementById('phoneWrapper');
    const input = document.getElementById('phone');
    
    wrapper.style.transition = 'all 0.5s ease';
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        input.value = '';
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'scale(1)';
    }, 500);
}

async function sendReport() {
    const phone = document.getElementById('phone').value.trim();
    
    if (!phone) {
        showToast('❌ Entrez un numéro valide', 3000);
        return;
    }
    
    if (!selectedType) {
        showToast('⚠️ Sélectionnez un motif', 3000);
        return;
    }
    
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = 'flex';
    
    try {
        await sendEmailReports(phone, selectedType, currentUid);
        await sendWebReports(phone, selectedType, currentUid);
        
        setTimeout(() => {
            overlay.style.display = 'none';
            // NOTIFICATION SIMPLIFIÉE
            showToast(`✅ rapport sent`, 15000);
            disappearPhoneNumber();
            document.querySelectorAll('.motif-btn').forEach(btn => btn.classList.remove('selected'));
            selectedType = null;
        }, 2000);
        
    } catch(e) {
        overlay.style.display = 'none';
        showToast('❌ Erreur - Réessayez', 3000);
    }
}

// ========== GESTION MENU ==========
function openMenu() {
    document.getElementById('sideMenu').classList.add('open');
    document.getElementById('menuOverlay').classList.add('active');
}

function closeMenu() {
    document.getElementById('sideMenu').classList.remove('open');
    document.getElementById('menuOverlay').classList.remove('active');
}

function copyUid() {
    if (currentUid) {
        navigator.clipboard.writeText(currentUid);
        showToast('✅ UID copié !', 2000);
    } else {
        showToast('❌ UID non disponible', 2000);
    }
}

// ========== ÉVÉNEMENTS ==========
document.getElementById('menuIcon').addEventListener('click', openMenu);
document.getElementById('closeMenuBtn').addEventListener('click', closeMenu);
document.getElementById('copyUidBtn').addEventListener('click', copyUid);
document.getElementById('menuOverlay').addEventListener('click', closeMenu);

document.getElementById('menuWhatsappBtn').addEventListener('click', () => {
    window.open(LINKS.WHATSAPP, '_blank');
    closeMenu();
});
document.getElementById('menuTelegramBtn').addEventListener('click', () => {
    window.open(LINKS.TELEGRAM, '_blank');
    closeMenu();
});
document.getElementById('menuOwnerBtn').addEventListener('click', () => {
    window.open(LINKS.OWNER, '_blank');
    closeMenu();
});

document.querySelectorAll('.motif-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.motif-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedType = btn.dataset.type;
    });
});

document.getElementById('sendBtn').addEventListener('click', sendReport);

// ========== INITIALISATION ==========
currentUid = getDeviceUID();
document.getElementById('userUid').innerText = currentUid;

// ========== ÉTOILES ==========
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let stars = [];
function initStars() {
    stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.6 + 0.2
        });
    }
}
initStars();

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(animateStars);
}
animateStars();

window.addEventListener('resize', () => {
    resize();
    initStars();
});
