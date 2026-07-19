/* ============================================================
   ARG-01「六年一夜」叙事引擎（轻量版）
   依据 WIKI/18-叙事引擎设计.md
   职责：章节进度、玩家选择、证据收集、倒计时、恐怖效果开关
   存储：localStorage（键 arg01_state）
   ============================================================ */
(function (global) {
  "use strict";

  var STORAGE_KEY = "arg01_state";

  var DEFAULT_STATE = {
    // 章节进度：0=序章 1-6=第一~六章 7=终章
    currentChapter: 0,
    chaptersCompleted: [],
    // 游戏内时间（秒，自 18:43 起）
    gameClock: "18:43",
    // 玩家选择
    choices: {
      ch1_excelVersion: null,      // 'original' | 'verified' | 'official'
      ch6_doorPermRefused: false,  // 第六章是否对门禁权限选"未确认"
      finale_choice: null          // 'sign' | 'refuse' | 'preserve' | 'submit_evidence'
    },
    // 证据收集（8 项证据链）
    evidence: {
      hanyu_tickets: false,     // 韩雨 4 条工单
      hanyu_recording: false,   // 第四章会议录音"我不同意"
      hanyu_riskReport: false,  // RISK-2024-0517
      hanyu_performance: false, // 绩效评估
      hanyu_docAuthor: false,   // 文档作者变"数智员工"
      delegationLetter: false,  // D19 空白授权委托书
      doorLog: false,           // D20 门禁日志
      signUndoCache: false      // 敖曼签字又撤销的缓存残留
    },
    horror: {
      contactsMerged: false,    // 通讯录合并已触发
      screenshotChanged: false  // 截图自我修改已触发
    }
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  var Engine = {
    state: null,

    init: function () {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        this.state = raw ? Object.assign(clone(DEFAULT_STATE), JSON.parse(raw)) : clone(DEFAULT_STATE);
      } catch (e) {
        this.state = clone(DEFAULT_STATE);
      }
      return this.state;
    },

    save: function () {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state)); } catch (e) {}
    },

    reset: function () {
      this.state = clone(DEFAULT_STATE);
      this.save();
    },

    /* ---- 章节 ---- */
    completeChapter: function (n) {
      if (this.state.chaptersCompleted.indexOf(n) === -1) {
        this.state.chaptersCompleted.push(n);
      }
      this.state.currentChapter = Math.max(this.state.currentChapter, n + 1);
      this.save();
    },
    isChapterUnlocked: function (n) {
      if (n === 0) return true;
      return this.state.chaptersCompleted.indexOf(n - 1) !== -1;
    },

    /* ---- 选择 ---- */
    setChoice: function (key, value) {
      this.state.choices[key] = value;
      this.save();
    },

    /* ---- 证据 ---- */
    collect: function (key) {
      if (key in this.state.evidence) {
        this.state.evidence[key] = true;
        this.save();
      }
    },
    evidenceCount: function () {
      var c = 0, e = this.state.evidence;
      for (var k in e) if (e[k]) c++;
      return c;
    },
    canUnlockEndingD: function () {
      var e = this.state.evidence;
      // D 结局：韩雨五碎片 + 委托书 + 门禁日志 + 签字撤销缓存
      return e.hanyu_tickets && e.hanyu_recording && e.hanyu_riskReport &&
             e.hanyu_performance && e.hanyu_docAuthor &&
             e.delegationLetter && e.doorLog && e.signUndoCache;
    },

    /* ---- 恐怖标志 ---- */
    setHorror: function (key) {
      if (key in this.state.horror) { this.state.horror[key] = true; this.save(); }
    },
    getHorror: function (key) { return !!this.state.horror[key]; },

    /* ---- 倒计时：今晚 24:00 关服。返回 {text, secondsLeft} ---- */
    countdown: function () {
      // 以真实时间演示：距离当日 24:00；若已过则显示 00:00:00
      var now = new Date();
      var end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0);
      var s = Math.max(0, Math.floor((end - now) / 1000));
      var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
      function pad(x) { return (x < 10 ? "0" : "") + x; }
      return { text: pad(h) + ":" + pad(m) + ":" + pad(sec), secondsLeft: s };
    },
    startCountdown: function (el) {
      function tick() { el.textContent = "数据保留倒计时 " + Engine.countdown().text; }
      tick();
      return setInterval(tick, 1000);
    },

    /* ---- 页面跳转 ---- */
    go: function (url) { global.location.href = url; }
  };

  Engine.init();
  global.ARG = Engine;
})(window);
