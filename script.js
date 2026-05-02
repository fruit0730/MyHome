// 分页逻辑优化
let currentPage = 1;
const itemsPerPage = 3;
const blogs = [
    {title: "发客(FineKeeper)工作室资源站免责声明", date: "2025年4月12日", cover: "PC_Bundle_Deluxe_Desktop.avif", link: "blog/FineKeeperDisclaimer.html"},
    {title: "测试文章2", date: "2025年4月13日", cover: "image/toolbox.png", link: "#"},
    {title: "测试文章3", date: "2025年4月14日", cover: "image/ReadLiner.png", link: "#"},
    {title: "测试文章4", date: "2025年4月15日", cover: "image/QIMG.png", link: "#"},
    {title: "测试文章5", date: "2025年4月16日", cover: "minecraft-creeper-face.avif", link: "#"},
    // 可以添加更多博客数据
];

function updatePagination() {
    const totalPages = Math.ceil(blogs.length / itemsPerPage) || 1;
    const pageIndicator = document.getElementById('page-indicator');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (pageIndicator) {
        pageIndicator.textContent = `${currentPage}/${totalPages}`;
    }

    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePagination();
    }
}

function nextPage() {
    const totalPages = Math.ceil(blogs.length / itemsPerPage) || 1;
    if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
    }
}

// 初始化分页
document.addEventListener('DOMContentLoaded', function() {
    updatePagination();

    // 延迟加载非关键交互
    requestAnimationFrame(function() {
        // 为卡片添加悬停效果
        document.querySelectorAll('.project-card, .blog-post').forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                card.style.zIndex = '10';
            });
            card.addEventListener('mouseleave', function() {
                card.style.zIndex = '1';
            });
        });

        // 为所有链接添加平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // 绑定分页按钮事件
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', prevPage);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', nextPage);
        }
    });
});

// 动态更新页面访问时间
window.addEventListener('load', function() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const timeElement = document.getElementById('update-time');
    if (timeElement) {
        timeElement.textContent = now.toLocaleDateString('zh-CN', options);
        timeElement.setAttribute('datetime', now.toISOString());
    }
});

// 性能和错误监控
(function() {
    // 错误处理
    window.addEventListener('error', function(e) {
        console.error('页面错误:', e.error);
        // 可以在这里添加错误上报逻辑
    });

    // 未捕获的Promise错误
    window.addEventListener('unhandledrejection', function(e) {
        console.error('未处理的Promise错误:', e.reason);
    });

    // 性能监控
    if ('performance' in window && 'timing' in performance) {
        window.addEventListener('load', function() {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log('页面加载时间:', loadTime + 'ms');

            // 可以在这里添加性能数据上报
        });
    }

    // 网络状态监控
    if ('onLine' in navigator) {
        window.addEventListener('online', function() {
            console.log('网络连接已恢复');
        });

        window.addEventListener('offline', function() {
            console.log('网络连接已断开');
        });
    }
})();

// 主题切换功能（预留）
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// 初始化主题
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
})();