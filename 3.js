// 修改滚动计算逻辑（script.js）
function updateActiveNav() {
  const scrollPos = window.pageYOffset + 60; // 增加60px偏移量补偿固定导航栏
  const viewportHeight = window.innerHeight;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - viewportHeight / 3;
    if (scrollPos >= sectionTop) {
      current = section.id;
    }
  });
}

// 滚动高亮功能
const sections = document.querySelectorAll('.content-section');
const navItems = document.querySelectorAll('.nav-item');

function updateActiveNav() {
    let current = '';
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - viewportHeight / 3;
        if (scrollPos >= sectionTop) {
            current = section.id;
        }
    });

    navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
    });
}

// 初始激活状态
updateActiveNav();

// 事件监听
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('resize', updateActiveNav);

// 响应式导航栏调整
function adjustSidebar() {
    const sidebar = document.querySelector('.sticky-sidebar');
    if (window.innerWidth <= 768) {
        sidebar.style.position = 'fixed';
        sidebar.style.bottom = '0';
        sidebar.style.top = 'auto';
    } else {
        sidebar.style.position = 'fixed';
        sidebar.style.top = '50%';
        sidebar.style.bottom = 'auto';
    }
}

// JavaScript 部分 (script.js)
let isPlaying = false;
let rotateInterval;
let currentAngle = 0;
const rotationSpeed = 1; // 旋转速度（度/10ms）
 
function togglePlay() {
    const audio = document.getElementById('myAudio');
    const image = document.getElementById('rotatingImage');
    
    if (!isPlaying) {
        // 播放音频
        audio.play();
        
        // 启动旋转动画
        rotateInterval = setInterval(() => {
            currentAngle += rotationSpeed;
            image.style.transform = `rotate(${currentAngle}deg)`;
        }, 10);
        
        isPlaying = true;
    } else {
        // 暂停音频
        audio.pause();
        
        // 停止旋转
        clearInterval(rotateInterval);
        isPlaying = false;
    }
}
 
// 可选：音频结束时自动重置
document.getElementById('myAudio').addEventListener('ended', () => {
    if (isPlaying) {
        togglePlay();
    }
});