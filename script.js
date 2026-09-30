const translations = {
  en: {
    skip: "Skip to content",
    navHome: "About",
    navPublications: "Publications",
    navThoughts: "Thoughts",
    bioOne: "I am an AI researcher based in Shanghai.",
    bioTwo: "My research interests include agents and reinforcement learning.",
    bioThree:
      "My recent work explores proactive agents, robust learning under label noise, and AI for healthcare.",
    scholar: "Google Scholar",
    publicationsTitle: "Publications",
    thoughtsTitle: "Thoughts",
    thoughtsEmpty: "Notes and essays will be added here.",
    pageDescription: "Yuxuan Fu is an AI researcher working on agents and reinforcement learning.",
    navigationLabel: "Primary navigation",
    languageLabel: "Language selection",
    homeLabel: "Yuxuan Fu — About",
    aboutLabel: "About Yuxuan Fu",
    portraitAlt: "Portrait image selected by Yuxuan Fu",
  },
  zh: {
    skip: "跳至正文",
    navHome: "关于",
    navPublications: "发表成果",
    navThoughts: "随笔",
    bioOne: "我是一名常驻上海的人工智能研究者。",
    bioTwo: "我的研究方向包括智能体与强化学习。",
    bioThree: "我近期的工作聚焦于主动式智能体、标签噪声下的鲁棒学习，以及医疗人工智能。",
    scholar: "谷歌学术",
    publicationsTitle: "发表成果",
    thoughtsTitle: "随笔",
    thoughtsEmpty: "这里将陆续更新笔记与文章。",
    pageDescription: "Yuxuan Fu 的个人主页，研究方向包括智能体与强化学习。",
    navigationLabel: "主导航",
    languageLabel: "语言选择",
    homeLabel: "Yuxuan Fu — 关于",
    aboutLabel: "关于 Yuxuan Fu",
    portraitAlt: "Yuxuan Fu 选用的个人图片",
  },
};

const languageButtons = document.querySelectorAll("[data-lang]");
const translatedElements = document.querySelectorAll("[data-i18n]");
const description = document.querySelector('meta[name="description"]');
const navigation = document.querySelector(".site-nav");
const languageSwitch = document.querySelector(".language-switch");
const siteName = document.querySelector(".site-name");
const profile = document.querySelector(".profile");
const portrait = document.querySelector(".portrait");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.section === sectionId);
  });
}

function setLanguage(language) {
  const copy = translations[language] ?? translations.en;

  document.documentElement.lang = language;
  translatedElements.forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[key]) element.textContent = copy[key];
  });

  description.setAttribute("content", copy.pageDescription);
  navigation.setAttribute("aria-label", copy.navigationLabel);
  languageSwitch.setAttribute("aria-label", copy.languageLabel);
  siteName.setAttribute("aria-label", copy.homeLabel);
  profile.setAttribute("aria-label", copy.aboutLabel);
  portrait.setAttribute("alt", copy.portraitAlt);

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setActiveNav(link.dataset.section));
});

document.querySelectorAll('a[href="#home"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveNav("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", "#home");
  });
});
document.querySelector("#current-year").textContent = new Date().getFullYear();

setLanguage("en");
