const hsk1QuizData = [
  {
    id: 1,
    type: "listening",
    question: "Nghe và chọn đáp án đúng (点击播放)",
    audio: "./", 
    options: ["A. 你好 (Nǐ hǎo)", "B. 谢谢 (Xièxiè)", "C. 再见 (Zàijiàn)"],
    correctAnswer: "A. 你好 (Nǐ hǎo)",
  },
  {
    id: 2,
    type: "reading",
    question: "Hình nào là '妈妈' (Māma)?",
    images: [
      { src: "https://chinesetest.online/fileluutru/chungchi/hsk/hsk2/bo1/images/12.jpg", text: "A" },
      { src: "https://chinesetest.online/fileluutru/chungchi/hsk/hsk2/bo1/images/13.jpg", text: "B" },
      { src: "https://chinesetest.online/fileluutru/chungchi/hsk/hsk2/bo1/images/15.jpg", text: "C" },
    ],
    correctAnswer: "A",
  },
  {
    id: 3,
    type: "reading",
    question: "Chọn từ đúng để hoàn thành câu: 他是____。",
    options: ["A. 中国 (Zhōngguó)", "B. 学生 (Xuéshēng)", "C. 老师 (Lǎoshī)"],
    correctAnswer: "C. 老师 (Lǎoshī)",
  },
];

export default hsk1QuizData;
