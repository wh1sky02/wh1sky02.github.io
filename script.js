// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate sections on scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .contact-card, .about-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Terminal typing effect
document.addEventListener('DOMContentLoaded', function() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    let delay = 0;
    
    terminalLines.forEach(line => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, delay);
        delay += 800;
    });
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 40px rgba(37, 99, 235, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    });

    // Skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 40px rgba(37, 99, 235, 0.15)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateX(-50px)';
        heroContent.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateX(0)';
        }, 300);
    }
    
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        heroImage.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 600);
    }
});

// Terminal Portfolio Interactive Script
class TerminalPortfolio {
    constructor() {
        this.commandInput = document.getElementById('command-input');
        this.terminal = document.getElementById('terminal');
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isProcessing = false;
        
        this.initializeTerminal();
        this.setupEventListeners();
        this.typeWelcomeMessage();
    }

    initializeTerminal() {
        // Focus on command input when page loads
        if (this.commandInput) {
            this.commandInput.focus();
        }

        // Available commands
        this.commands = {
            'help': this.showHelp.bind(this),
            'whoami': this.showWhoami.bind(this),
            'cat about': this.showAbout.bind(this),
            'cat skills': this.showSkills.bind(this),
            'ls projects': this.showProjects.bind(this),
            'cat contact': this.showContact.bind(this),
            'clear': this.clearTerminal.bind(this),
            'neofetch': this.showNeofetch.bind(this),
            'pwd': this.showPwd.bind(this),
            'date': this.showDate.bind(this),
            'uname': this.showUname.bind(this),
            'history': this.showHistory.bind(this)
        };
    }

    setupEventListeners() {
        // Command input handling
        if (this.commandInput) {
            this.commandInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.processCommand();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateHistory('up');
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigateHistory('down');
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    this.autoComplete();
                }
            });
        }

        // Click anywhere to focus command input
        document.addEventListener('click', () => {
            if (this.commandInput && !this.isProcessing) {
                this.commandInput.focus();
            }
        });

        // Keep cursor in view
        this.commandInput?.addEventListener('input', () => {
            this.scrollToBottom();
        });
    }

    async processCommand() {
        if (this.isProcessing) return;
        
        const command = this.commandInput.value.trim().toLowerCase();
        if (!command) return;

        this.isProcessing = true;
        
        // Add to history
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;

        // Display command
        this.addCommandToTerminal(command);
        
        // Clear input
        this.commandInput.value = '';

        // Process command with typing delay
        await this.sleep(300);
        
        if (this.commands[command]) {
            await this.commands[command]();
        } else {
            await this.showCommandNotFound(command);
        }

        this.isProcessing = false;
        this.scrollToBottom();
        this.commandInput.focus();
    }

    addCommandToTerminal(command) {
        const commandSection = document.createElement('div');
        commandSection.className = 'command-history';
        commandSection.innerHTML = `
            <div class="terminal-line">
                <span class="prompt">┌──(wh1sky02㉿kali-linux)-[~]</span>
            </div>
            <div class="terminal-line">
                <span class="prompt">└─$</span> ${command}
            </div>
        `;
        
        // Insert before the input section
        const inputSection = document.querySelector('.command-input-section');
        inputSection.parentNode.insertBefore(commandSection, inputSection);
    }

    async showHelp() {
        const helpContent = `
            <div class="terminal-output">
                <p><span class="highlight">[HELP]</span> Available Commands:</p>
                <p>  <span class="cmd">help</span>            - Show this help menu</p>
                <p>  <span class="cmd">whoami</span>          - Display user information</p>
                <p>  <span class="cmd">cat about</span>       - View personal information</p>
                <p>  <span class="cmd">cat skills</span>      - List technical skills</p>
                <p>  <span class="cmd">ls projects</span>     - Show featured projects</p>
                <p>  <span class="cmd">cat contact</span>     - Get contact information</p>
                <p>  <span class="cmd">neofetch</span>        - Display system information</p>
                <p>  <span class="cmd">clear</span>           - Clear terminal screen</p>
                <p>  <span class="cmd">pwd</span>             - Print working directory</p>
                <p>  <span class="cmd">date</span>            - Show current date</p>
                <p>  <span class="cmd">history</span>         - Show command history</p>
                <br>
                <p><span class="highlight">[TIP]</span> Use Tab for autocompletion, ↑/↓ for command history</p>
            </div>
        `;
        await this.typeResponse(helpContent);
    }

    async showWhoami() {
        const whoamiContent = `
            <div class="terminal-output">
                <p>wh1sky02</p>
                <br>
                <p>uid=1000(wh1sky02) gid=1000(wh1sky02) groups=1000(wh1sky02),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),120(lpadmin),132(lxd),133(sambashare),142(docker)</p>
                <br>
                <p><span class="highlight">[USER INFO]</span></p>
                <p>Name: Sein Linn</p>
                <p>Role: Cybersecurity Student & Developer</p>
                <p>Location: Myanmar</p>
                <p>Shell: /bin/bash</p>
            </div>
        `;
        await this.typeResponse(whoamiContent);
    }

    async showAbout() {
        const aboutContent = `
            <div class="terminal-output">
                <p><span class="highlight">[ABOUT]</span> Personal Information</p>
                <p>I'm a Computer Science student from Myanmar with a passion for cybersecurity</p>
                <p>and web development. I love breaking things (legally) to understand how to</p>
                <p>secure them better.</p>
                <br>
                <p>When I'm not hunting for vulnerabilities or building web applications,</p>
                <p>you can find me participating in CTF competitions or contributing to</p>
                <p>open-source security projects.</p>
                <br>
                <p><span class="highlight">[STATS]</span></p>
                <p>  Years Coding: 2+</p>
                <p>  Projects Built: 10+</p>
                <p>  Problems Solved: ∞</p>
                <p>  Coffee Consumed: Too much ☕</p>
            </div>
        `;
        await this.typeResponse(aboutContent);
    }

    async showSkills() {
        const skillsContent = `
            <div class="terminal-output">
                <div class="json-output">{
  "programming_languages": [
    "Python",
    "JavaScript", 
    "PHP",
    "Bash"
  ],
  "security_tools": [
    "Kali Linux",
    "Burp Suite", 
    "Wireshark",
    "Metasploit"
  ],
  "frameworks": [
    "React",
    "Django",
    "Node.js",
    "Express"
  ],
  "tools_and_others": [
    "Git",
    "Docker",
    "Linux",
    "MongoDB"
  ],
  "currently_learning": [
    "Advanced Penetration Testing",
    "Cloud Security",
    "Reverse Engineering"
  ]
}</div>
            </div>
        `;
        await this.typeResponse(skillsContent);
    }

    async showProjects() {
        const projectsContent = `
            <div class="terminal-output">
                <div class="project-listing">
                    <div class="project-item">
                        <div class="project-header">
                            <span class="file-permissions">-rwxr-xr-x</span> 
                            <span class="project-name">CafeQR/</span>
                            <a href="https://github.com/wh1sky02/cafe_qr" target="_blank" class="github-link">[GitHub]</a>
                        </div>
                        <div class="project-description">Modern Django QR ordering system for restaurants with real-time order management.</div>
                        <div class="project-tech">Tech Stack: Django, Python, JavaScript</div>
                    </div>
                    
                    <div class="project-item">
                        <div class="project-header">
                            <span class="file-permissions">-rwxr-xr-x</span> 
                            <span class="project-name">RavenGPT/</span>
                            <a href="https://github.com/wh1sky02/RavenGPT" target="_blank" class="github-link">[GitHub]</a>
                        </div>
                        <div class="project-description">Browser-based GPT application with clean interface and advanced features.</div>
                        <div class="project-tech">Tech Stack: JavaScript, HTML/CSS, API</div>
                    </div>
                    
                    <div class="project-item">
                        <div class="project-header">
                            <span class="file-permissions">-rwxr-xr-x</span> 
                            <span class="project-name">API-Validator/</span>
                            <a href="https://github.com/wh1sky02/openai-api-key-validator" target="_blank" class="github-link">[GitHub]</a>
                        </div>
                        <div class="project-description">Bulk OpenAI API key validation tool for developers and businesses.</div>
                        <div class="project-tech">Tech Stack: Python, API, Automation</div>
                    </div>
                </div>
            </div>
        `;
        await this.typeResponse(projectsContent);
    }

    async showContact() {
        const contactContent = `
            <div class="terminal-output">
                <p><span class="highlight">[CONTACT]</span> Let's Connect!</p>
                <p>Interested in cybersecurity, have a project in mind, or just want to chat?</p>
                <p>I'd love to hear from you!</p>
                <br>
                <div class="contact-info">
                    <p><i class="fas fa-envelope"></i> Email: <a href="mailto:wh1sky02@protonmail.com">wh1sky02@protonmail.com</a></p>
                    <p><i class="fab fa-github"></i> GitHub: <a href="https://github.com/wh1sky02" target="_blank">@wh1sky02</a></p>
                    <p><i class="fab fa-telegram"></i> Telegram: <a href="https://t.me/wh1sky02" target="_blank">@wh1sky02</a></p>
                    <p><i class="fas fa-flag"></i> TryHackMe: <a href="https://tryhackme.com/p/wh1sky02" target="_blank">wh1sky02</a></p>
                </div>
                <br>
                <p><span class="highlight">[PGP]</span> For secure communications, my PGP key is available on request.</p>
            </div>
        `;
        await this.typeResponse(contactContent);
    }

    async showNeofetch() {
        const neofetchContent = `
            <div class="terminal-output">
                <div style="color: #58a6ff;">
                <pre>
       _,met$$$$$gg.          <span style="color: #00ff00;">wh1sky02</span>@<span style="color: #00ff00;">kali-linux</span>
    ,g$$$$$$$$$$$$$$$P.       ───────────────────────
  ,g$$P"     """Y$$.".        <span style="color: #ffa500;">OS</span>: Kali GNU/Linux Rolling
 ,$$P'              \`$$$.     <span style="color: #ffa500;">Kernel</span>: 6.5.0-kali3-amd64
',$$P       ,ggs.     \`$$b:   <span style="color: #ffa500;">Uptime</span>: 2 days, 14 hours, 37 mins
\`d$$'     ,$P"'   .    $$$    <span style="color: #ffa500;">Packages</span>: 2847 (dpkg)
 $$P      d$'     ,    $$P    <span style="color: #ffa500;">Shell</span>: bash 5.2.15
 $$:      $$.   -    ,d$$'    <span style="color: #ffa500;">Resolution</span>: 1920x1080
 $$;      Y$b._   _,d$P'      <span style="color: #ffa500;">DE</span>: Xfce 4.18
 Y$$.    \`."Y$$$$P"'         <span style="color: #ffa500;">Theme</span>: Kali-Dark [GTK2/3]
 \`$$b      "-.__             <span style="color: #ffa500;">Terminal</span>: gnome-terminal
  \`Y$$                       <span style="color: #ffa500;">CPU</span>: Intel i7-10750H (12) @ 2.600GHz
   \`Y$$.                     <span style="color: #ffa500;">GPU</span>: NVIDIA GeForce GTX 1650 Ti
     \`$$b.                   <span style="color: #ffa500;">Memory</span>: 6742MiB / 15935MiB
       \`Y$$b.
          \`"Y$b._
              \`"""
                </pre>
                </div>
            </div>
        `;
        await this.typeResponse(neofetchContent);
    }

    async showPwd() {
        const pwdContent = `
            <div class="terminal-output">
                <p>/home/wh1sky02</p>
            </div>
        `;
        await this.typeResponse(pwdContent);
    }

    async showDate() {
        const now = new Date();
        const dateContent = `
            <div class="terminal-output">
                <p>${now.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })}</p>
            </div>
        `;
        await this.typeResponse(dateContent);
    }

    async showUname() {
        const unameContent = `
            <div class="terminal-output">
                <p>Linux kali-linux 6.5.0-kali3-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.5.6-1kali1 (2023-10-09) x86_64 GNU/Linux</p>
            </div>
        `;
        await this.typeResponse(unameContent);
    }

    async showHistory() {
        const historyContent = `
            <div class="terminal-output">
                <p><span class="highlight">[COMMAND HISTORY]</span></p>
                ${this.commandHistory.map((cmd, index) => 
                    `<p>  ${index + 1}  ${cmd}</p>`
                ).join('')}
            </div>
        `;
        await this.typeResponse(historyContent);
    }

    async showCommandNotFound(command) {
        const errorContent = `
            <div class="terminal-output">
                <p class="error-message">bash: ${command}: command not found</p>
                <p>Type '<span class="cmd">help</span>' to see available commands.</p>
            </div>
        `;
        await this.typeResponse(errorContent);
    }

    clearTerminal() {
        // Remove all command history and responses
        const commandHistories = document.querySelectorAll('.command-history');
        const terminalOutputs = document.querySelectorAll('.terminal-output');
        
        commandHistories.forEach(el => el.remove());
        terminalOutputs.forEach(el => {
            if (!el.closest('.hidden-section')) {
                el.remove();
            }
        });

        this.commandInput.focus();
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;

        if (direction === 'up') {
            if (this.historyIndex > 0) {
                this.historyIndex--;
            }
        } else if (direction === 'down') {
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
            } else {
                this.historyIndex = this.commandHistory.length;
                this.commandInput.value = '';
                return;
            }
        }

        this.commandInput.value = this.commandHistory[this.historyIndex] || '';
    }

    autoComplete() {
        const input = this.commandInput.value.toLowerCase();
        const matches = Object.keys(this.commands).filter(cmd => 
            cmd.startsWith(input)
        );

        if (matches.length === 1) {
            this.commandInput.value = matches[0];
        } else if (matches.length > 1) {
            // Show available completions
            const completionContent = `
                <div class="terminal-output">
                    <p>Available completions:</p>
                    ${matches.map(match => `<p>  <span class="cmd">${match}</span></p>`).join('')}
                </div>
            `;
            this.addResponse(completionContent);
        }
    }

    async typeResponse(content) {
        const responseDiv = document.createElement('div');
        responseDiv.innerHTML = content;
        
        const inputSection = document.querySelector('.command-input-section');
        inputSection.parentNode.insertBefore(responseDiv, inputSection);
        
        // Add typing animation
        responseDiv.style.opacity = '0';
        responseDiv.style.transform = 'translateY(10px)';
        
        await this.sleep(100);
        
        responseDiv.style.transition = 'all 0.3s ease';
        responseDiv.style.opacity = '1';
        responseDiv.style.transform = 'translateY(0)';
        
        this.scrollToBottom();
    }

    addResponse(content) {
        const responseDiv = document.createElement('div');
        responseDiv.innerHTML = content;
        
        const inputSection = document.querySelector('.command-input-section');
        inputSection.parentNode.insertBefore(responseDiv, inputSection);
        
        this.scrollToBottom();
    }

    scrollToBottom() {
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async typeWelcomeMessage() {
        // Add welcome typing effect
        await this.sleep(1000);
        
        const lines = document.querySelectorAll('.terminal-line, .terminal-output');
        
        for (let i = 0; i < lines.length; i++) {
            await this.sleep(200);
            lines[i].style.opacity = '1';
            lines[i].style.transform = 'translateY(0)';
        }
        
        // Focus on input after welcome message
        await this.sleep(500);
        this.commandInput?.focus();
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add initial fade-in effect
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        terminalBody.style.opacity = '0';
        setTimeout(() => {
            terminalBody.style.transition = 'opacity 1s ease';
            terminalBody.style.opacity = '1';
        }, 500);
    }
    
    // Initialize terminal portfolio
    new TerminalPortfolio();
    
    // Add matrix rain effect (optional)
    // createMatrixRain();
});

// Optional Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-bg';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00FF00';
        ctx.font = fontSize + 'px JetBrains Mono';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Add some easter eggs
const easterEggs = {
    'sudo rm -rf /': () => {
        return `
            <div class="terminal-output">
                <p class="error-message">rm: it is dangerous to operate recursively on '/'</p>
                <p class="error-message">rm: use --no-preserve-root to override this failsafe</p>
                <p>Nice try! 😏</p>
            </div>
        `;
    },
    'hack': () => {
        return `
            <div class="terminal-output">
                <p class="success-message">Initiating hack sequence...</p>
                <p>Just kidding! I'm an ethical hacker 😉</p>
            </div>
        `;
    }
}; 