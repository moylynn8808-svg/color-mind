// 色彩心事 — 核心逻辑

const App = {
  currentQuestion: 0,
  scores: { sun: 0, kid: 0, deep: 0, root: 0, watch: 0 },
  history: [],

  init() {
    this.loadHistory();
    this.showPage('home');
  },

  // ========== 页面切换 ==========
  showPage(page) {
    document.querySelectorAll('.page').forEach(p => {
      p.classList.remove('active');
      p.style.display = 'none';
    });
    const target = document.getElementById(`page-${page}`);
    target.classList.add('active');
    // 首页和历史记录用 flex
    if (page === 'home' || page === 'history') {
      target.style.display = 'flex';
    } else {
      target.style.display = 'block';
    }
  },

  // ========== 首页 ==========
  startTest() {
    this.currentQuestion = 0;
    this.scores = { sun: 0, kid: 0, deep: 0, root: 0, watch: 0 };
    this.showPage('test');
    this.renderQuestion();
  },

  // ========== 测试页 ==========
  renderQuestion() {
    const q = QUESTIONS[this.currentQuestion];
    const progress = document.getElementById('progress');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options');

    // 进度
    progress.textContent = `${this.currentQuestion + 1} / ${QUESTIONS.length}`;
    questionText.textContent = q.text;

    // 选项
    optionsContainer.innerHTML = '';
    if (q.isColor) {
      // 颜色题：5 个色块
      q.colors.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'color-option';
        btn.style.background = c.color;
        btn.setAttribute('data-personality', c.personality);
        btn.title = c.label;
        optionsContainer.appendChild(btn);
      });
    } else {
      // 情境题：4 个按钮
      q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt.text;
        btn.setAttribute('data-personality', opt.personality);
        optionsContainer.appendChild(btn);
      });
    }

    // 绑定点击事件
    optionsContainer.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => this.selectOption(btn));
    });
  },

  selectOption(btn) {
    const personality = btn.getAttribute('data-personality');
    this.scores[personality]++;

    this.currentQuestion++;
    if (this.currentQuestion < QUESTIONS.length) {
      // 淡出 → 切换 → 淡入
      const questionEl = document.getElementById('question-container');
      questionEl.style.opacity = '0';
      setTimeout(() => {
        this.renderQuestion();
        questionEl.style.opacity = '1';
      }, 300);
    } else {
      this.showResult();
    }
  },

  // ========== 结果计算 ==========
  calcResult() {
    const sorted = Object.entries(this.scores)
      .sort((a, b) => b[1] - a[1]);

    const mainId = sorted[0][0];
    const subId = sorted[1][0];

    return {
      main: PERSONALITIES[mainId],
      sub: PERSONALITIES[subId],
      mainId,
      subId,
      scores: this.scores
    };
  },

  // ========== 结果页 ==========
  showResult() {
    const result = this.calcResult();
    this.saveResult(result);

    // 填充结果页
    document.getElementById('result-bg').style.background =
      `linear-gradient(135deg, ${result.main.color}40 0%, ${result.main.colorLight} 100%)`;

    document.getElementById('main-emoji').textContent = result.main.emoji;
    document.getElementById('main-label').textContent = result.main.label;
    document.getElementById('main-name').textContent = result.main.name;

    // 副人格
    document.getElementById('sub-emoji').textContent = result.sub.emoji;
    document.getElementById('sub-name').textContent = `${result.sub.label} · ${result.sub.name}`;
    document.getElementById('sub-hint').textContent = result.sub.subPersonalityHint;

    // 焦虑描述
    document.getElementById('anxiety-text').textContent = result.main.anxiety;

    // 朋友圈文案
    document.getElementById('copy-text').textContent = result.main.copy;

    // 推荐视频
    document.getElementById('video-title').textContent = result.main.video.title;
    document.getElementById('video-desc').textContent = result.main.video.desc;

    // 金句
    document.getElementById('golden-text').textContent = result.main.golden;

    // 海报
    const poster = result.main;
    document.getElementById('poster-bg').style.background =
      `linear-gradient(135deg, ${poster.color}60 0%, ${poster.colorLight} 100%)`;
    document.getElementById('poster-emoji').textContent = poster.emoji;
    document.getElementById('poster-label').textContent = poster.label;
    document.getElementById('poster-name').textContent = poster.name;
    document.getElementById('poster-golden').textContent = `"${poster.golden}"`;

    this.showPage('result');
  },

  // ========== 保存测试结果到历史记录 ==========
  saveResult(result) {
    const record = {
      id: Date.now(),
      date: new Date().toISOString(),
      mainId: result.mainId,
      subId: result.subId,
      main: {
        name: result.main.name,
        label: result.main.label,
        emoji: result.main.emoji,
        color: result.main.color
      },
      sub: {
        name: result.sub.name,
        label: result.sub.label,
        emoji: result.sub.emoji
      }
    };

    // 添加到历史记录数组开头
    this.history.unshift(record);
    
    // 最多保留 50 条记录
    if (this.history.length > 50) {
      this.history = this.history.slice(0, 50);
    }

    // 保存到 localStorage
    this.saveToStorage();
  },

  // ========== 保存到本地存储 ==========
  saveToStorage() {
    try {
      localStorage.setItem('colorMind_history', JSON.stringify(this.history));
    } catch (e) {
      console.error('保存历史记录失败:', e);
    }
  },

  // ========== 从本地存储加载历史记录 ==========
  loadHistory() {
    try {
      const stored = localStorage.getItem('colorMind_history');
      if (stored) {
        this.history = JSON.parse(stored);
      }
    } catch (e) {
      console.error('加载历史记录失败:', e);
      this.history = [];
    }
  },

  // ========== 显示历史记录页面 ==========
  showHistory() {
    this.renderHistoryList();
    this.showPage('history');
  },

  // ========== 渲染历史记录列表 ==========
  renderHistoryList() {
    const container = document.getElementById('history-list');
    
    if (this.history.length === 0) {
      container.innerHTML = '<div class="empty">暂无历史记录</div>';
      return;
    }

    container.innerHTML = this.history.map(record => {
      const date = new Date(record.date);
      const dateStr = `${date.getMonth() + 1}月${date.getDate()}日 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      
      return `
        <div class="history-item" data-id="${record.id}">
          <div class="history-info">
            <div class="history-main">
              <span class="history-emoji" style="background: ${record.main.color}20; padding: 4px 8px; border-radius: 8px; margin-right: 8px;">${record.main.emoji}</span>
              ${record.main.label} · ${record.main.name}
            </div>
            <div class="history-sub">
              副人格: ${record.sub.label} · ${record.sub.name} ${record.sub.emoji}
            </div>
          </div>
          <div class="history-date">${dateStr}</div>
        </div>
      `;
    }).join('');
  },

  // ========== 复制文案 ==========
  copyCopy() {
    const text = document.getElementById('copy-text').textContent;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('copy-btn');
      btn.textContent = '已复制 ✅';
      setTimeout(() => btn.textContent = '复制文案', 2000);
    });
  },

  // ========== 生成海报 ==========
  generatePoster() {
    const poster = document.getElementById('poster-content');
    
    // 临时显示海报容器以便截图
    const container = document.querySelector('.poster-container');
    const originalLeft = container.style.left;
    container.style.left = '0';
    container.style.top = '0';
    container.style.zIndex = '-1';
    
    html2canvas(poster, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      width: 1080,
      height: 1440
    }).then(canvas => {
      // 恢复隐藏
      container.style.left = originalLeft || '-9999px';
      container.style.top = '0';
      container.style.zIndex = 'auto';
      
      // 下载图片
      const link = document.createElement('a');
      link.download = '色彩心事-' + new Date().getTime() + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }).catch(err => {
      console.error('生成海报失败:', err);
      alert('生成海报失败，请重试');
      // 恢复隐藏
      container.style.left = originalLeft || '-9999px';
    });
  },

  // ========== 分享结果 ==========
  shareResult() {
    if (navigator.share) {
      const mainName = document.getElementById('main-name').textContent;
      const mainLabel = document.getElementById('main-label').textContent;
      const goldenText = document.getElementById('golden-text').textContent;
      
      navigator.share({
        title: '色彩心事 - 我的测试结果',
        text: `我是${mainLabel} · ${mainName}。${goldenText}`,
        url: window.location.href
      }).catch(err => {
        console.log('分享取消:', err);
      });
    } else {
      // 不支持 Web Share API，复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('链接已复制到剪贴板，快去分享给朋友吧！');
      });
    }
  },

  backToHome() {
    this.showPage('home');
  }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  App.init();

  // 首页按钮
  document.getElementById('start-btn').addEventListener('click', () => App.startTest());
  document.getElementById('history-btn').addEventListener('click', () => App.showHistory());

  // 结果页按钮
  document.getElementById('copy-btn').addEventListener('click', () => App.copyCopy());
  document.getElementById('poster-btn').addEventListener('click', () => App.generatePoster());
  document.getElementById('share-btn').addEventListener('click', () => App.shareResult());

  // 历史记录页按钮
  document.getElementById('back-btn').addEventListener('click', () => App.backToHome());
});
