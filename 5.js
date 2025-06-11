// 窗口拖拽功能
let isDragging = false;
let startX, startY, initialX = 0, initialY = 0;

const floatWindow = document.getElementById('floatWindow');
const header = document.querySelector('.window-header');
const audio = document.getElementById('myAudio');
const image = document.getElementById('rotatingImage');

// 添加音频错误监听
audio.addEventListener('error', (e) => {
    console.error('音频加载错误:', e);
    alert('音频加载失败，请检查：\n1. 文件路径是否正确\n2. 文件格式是否受支持\n3. 浏览器控制台是否有错误信息');
});

header.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDrag);

function startDrag(e) {
    isDragging = true;
    startX = e.clientX - initialX;
    startY = e.clientY - initialY;
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    initialX = e.clientX - startX;
    initialY = e.clientY - startY;
    floatWindow.style.transform = `translate(${initialX}px, ${initialY}px)`;
}

function stopDrag() {
    isDragging = false;
}

// 音画控制逻辑
let isPlaying = false;
let rotateInterval;
let currentAngle = 0;
const rotationSpeed = 1;

function togglePlay() {
    if (!isPlaying) {
        // 播放前检查音频是否准备好
        if (audio.readyState >= 2) {
            audio.play().catch(error => {
                console.error('播放被阻止:', error);
                alert('需要用户交互后才能播放音频，请先点击页面任意位置');
            });
        } else {
            audio.addEventListener('canplay', () => {
                audio.play();
            });
        }

        rotateInterval = setInterval(() => {
            currentAngle = (currentAngle + rotationSpeed) % 360;
            image.style.transform = `rotate(${currentAngle}deg)`;
        }, 10);
        isPlaying = true;
    } else {
        audio.pause();
        clearInterval(rotateInterval);
        isPlaying = false;
    }
}

// 关闭窗口
function closeWindow() {
    floatWindow.style.display = 'none';
}

// 音频结束时自动重置
audio.addEventListener('ended', () => {
    if (isPlaying) togglePlay();
});