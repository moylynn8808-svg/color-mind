// 色彩心事 — 人格数据

const PERSONALITIES = {
  sun: {
    id: 'sun',
    name: '追光者',
    color: '#F4A460',
    colorLight: '#FDE8D0',
    emoji: '🌻',
    label: '暖黄色',
    anxiety: '每天醒来就有做不完的事。\n不是忙，是"一直在运转"。\n你需要的不是更多时间，\n是一个能让光进来的缺口。',
    copy: '今天花了 10 分钟，这 10 分钟完全属于我自己。',
    golden: '你不需要更努力，你需要光。',
    video: { title: 'EP01-1《只选 3 个颜色》', desc: '颜色越少，眼睛越会选' },
    subPersonalityHint: '你的另一面，是个害怕犯错的小孩'
  },
  kid: {
    id: 'kid',
    name: '小孩',
    color: '#F8C8DC',
    colorLight: '#FDE8F0',
    emoji: '🎀',
    label: '柔粉色',
    anxiety: '你画了擦，擦了画。\n不是画不好，\n是总觉得"不够好"。\n其实你缺的不是天赋，\n是敢画错的勇气。',
    copy: '涂得乱七八糟的一天。但我笑得很开心。',
    golden: '画画最大的天赋不是选对颜色，是敢画错。',
    video: { title: 'EP01-2《7:2:1 配色法则》', desc: '平均不是好看，安全不是高级' },
    subPersonalityHint: '你的另一面，在等一个懂你的人'
  },
  deep: {
    id: 'deep',
    name: '独处者',
    color: '#4169E1',
    colorLight: '#D6E0F5',
    emoji: '🌊',
    label: '深蓝色',
    anxiety: '说了也没人懂，不如不说。\n不是孤独，是"身边的人不懂"。\n没关系，\n画给你的。不给他们。',
    copy: '深紫色 + 金色。有时候一点光就够了。',
    golden: '画给你的。不给他们。',
    video: { title: 'EP01-3《互补色点睛》', desc: '有时候，一点光就够了' },
    subPersonalityHint: '你的另一面，在寻找答案'
  },
  root: {
    id: 'root',
    name: '寻根者',
    color: '#8B7355',
    colorLight: '#E8DCC8',
    emoji: '🌿',
    label: '大地绿',
    anxiety: '大家都说我该满足，\n但我就是觉得缺了什么。\n不是不知足，\n是还没找到属于自己的节奏。\n慢慢来，颜色会自己找到家。',
    copy: '我不知道自己想要什么，但我知道我不想要什么。',
    golden: '慢慢来，颜色会自己找到家。',
    video: { title: 'EP02-1《手机调黑白》', desc: '3 秒看清自己的层次' },
    subPersonalityHint: '你的另一面，在等一个转机'
  },
  watch: {
    id: 'watch',
    name: '观察者',
    color: '#9370DB',
    colorLight: '#E8E0F5',
    emoji: '🔮',
    label: '平衡紫',
    anxiety: '每个选项都有道理，\n但你不知道哪个适合你。\n不是选错，\n是还没听到自己心里的声音。\n答案不在选项里，在你心里。',
    copy: '选了好久的颜色。最后发现，喜欢的就是最好的。',
    golden: '答案不在选项里，在你心里。',
    video: { title: 'EP03-1《第一眼看哪里》', desc: '第一眼的方向，就是心的方向' },
    subPersonalityHint: '你的另一面，在找自己的根'
  }
};

const QUESTIONS = [
  {
    id: 1,
    text: '周末下午终于有空了，你最可能在哪里？',
    options: [
      { text: '沙发上刷手机，不想动', personality: 'sun' },
      { text: '收拾屋子，边收拾边焦虑', personality: 'kid' },
      { text: '一个人安静待着，不回消息', personality: 'deep' },
      { text: '不知道该干嘛，但也不想出门', personality: 'root' }
    ]
  },
  {
    id: 2,
    text: '有人跟你说"你最近状态不好"，你第一反应是——',
    options: [
      { text: '"我没事"——然后继续忙', personality: 'sun' },
      { text: '开始反思：哪里不好？能改吗？', personality: 'kid' },
      { text: '沉默。说了你也不懂。', personality: 'deep' },
      { text: '也许吧……但到底哪里不好呢？', personality: 'root' }
    ]
  },
  {
    id: 3,
    text: '如果让你画一幅画，你会——',
    options: [
      { text: '不知道画什么，懒得画', personality: 'sun' },
      { text: '画一笔就觉得自己画得丑', personality: 'kid' },
      { text: '画给自己看，不给人看', personality: 'deep' },
      { text: '先看一堆教程再动手', personality: 'watch' }
    ]
  },
  {
    id: 4,
    text: '如果发一条朋友圈，你会写——',
    options: [
      { text: '一个表情，什么都不说', personality: 'sun' },
      { text: '精修图 + "今天也要加油"', personality: 'kid' },
      { text: '不发消息', personality: 'deep' },
      { text: '"有点累，想休息"', personality: 'root' }
    ]
  },
  {
    id: 5,
    text: '如果颜色能代表你现在的心情，你会选哪个？',
    isColor: true,
    colors: [
      { color: '#F4A460', label: '暖黄色', personality: 'sun' },
      { color: '#F8C8DC', label: '柔粉色', personality: 'kid' },
      { color: '#4169E1', label: '深蓝色', personality: 'deep' },
      { color: '#8B7355', label: '大地绿', personality: 'root' },
      { color: '#9370DB', label: '平衡紫', personality: 'watch' }
    ]
  }
];

// 副人格推荐映射
const SUB_PERSONALITY_MAP = {
  sun: 'kid',
  kid: 'deep',
  deep: 'watch',
  root: 'sun',
  watch: 'root'
};

