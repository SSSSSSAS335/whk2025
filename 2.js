document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;
    let autoPlayInterval;
    const itemWidth = items[0].clientWidth; // 获取单个项宽度

    // 创建导航指示点（保持不变）
    function createDots() {
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    // 修改显示逻辑为滑动
    function showSlide(index) {
        // 计算滑动距离（负值表示向左移动）
        const offset = -index * itemWidth;
        track.style.transform = `translateX(${offset}px)`;
        
        // 更新指示点（保持不变）
        dotsContainer.children.forEach(dot => dot.classList.remove('active'));
        dotsContainer.children[index].classList.add('active');
    }

    // 切换逻辑（保持不变）
    function goToSlide(index) {
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;
        currentIndex = index;
        showSlide(currentIndex);
    }

    // 自动播放（保持不变）
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            showSlide(currentIndex);
        }, 2500);
    }

    // 初始化（保持不变）
    function init() {
        createDots();
        startAutoPlay();
        
        // 鼠标事件（保持不变）
        document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoPlay);
    }

    init();
});