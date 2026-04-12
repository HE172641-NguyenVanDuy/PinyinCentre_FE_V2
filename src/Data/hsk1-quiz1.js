const hsk1QuizData = [
    {
      exam: {
        level: 1,
        title: "Đề thi số 1",
        total_questions: 40,
        audio_file: "/assets/audio/hsk1-quiz1.mp3",
        common_choices: [
          {
            A: "A",
            B: "B",
            C: "C",
            D: "D",
            E: "E",
            F: "F",
          },
        ],
        common_listening: "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image92.png",
        common_reading1: "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image293.png",
        common_reading2: [
          {
            A: "医院 (Yīyuàn)",
            B: "下雨了 (Xià yǔ le)",
            C: "我不认识她 (Wǒ bù rènshí tā)",
            D: "7岁 (7 suì)",
            E: "下个月 (Xià gè yuè)",
            F: "好的，谢谢! (Hǎo de, xièxiè!)",
          },
        ],
        common_reading3: [
          {
            A: "坐 (zuò)",
            B: "前面 (qiánmiàn)",
            C: "没关系 (méi guānxì)",
            D: "名字 (míngzi)",
            E: "汉语 (Hànyǔ)",
            F: "月 (yuè)",
          },
        ],
        listening: {
          questions: [
            {
              id: 1,
              type: "nghe_hinh_anh",
              choices: [{ A: "True" }, { B: "False" }],
              correct_answer: "A",
              image:
                "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image235.png",
            },
            {
              id: 2,
              type: "nghe_hinh_anh",
              choices: [{ A: "True" }, { B: "False" }],
              correct_answer: "B",
              image:
                "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image174.png",
            },
            {
              id: 3,
              type: "nghe_hinh_anh",
              choices: [{ A: "True" }, { B: "False" }],
              correct_answer: "B",
              image:
                "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image116.png",
            },
            {
              id: 4,
              type: "nghe_hinh_anh",
              choices: [{ A: "True" }, { B: "False" }],
              correct_answer: "B",
              image:
                "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image300.png",
            },
            {
              id: 5,
              type: "nghe_hinh_anh",
              choices: [{ A: "True" }, { B: "False" }],
              correct_answer: "A",
              image:
                "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image267.png",
            },
            {
              id: 6,
              type: "nghe_3_hinh",
              choices: [
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image114.png", text: "A"  },
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image126.png", text: "B"  },
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image306.png", text: "C" }
              ],
              correct_answer: "A",
            },
            {
              id: 7,
              type: "nghe_3_hinh",
              choices: [
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image26.png", text: "A" },
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image181.png", text: "B"  },
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image115.png", text: "C"}
              ],
              correct_answer: "A",
            },
            {
              id: 8,
              type: "nghe_3_hinh",
              choices: [
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image246.png", text: "A" },
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image122.png", text: "B" },
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image216.png", text: "C" }
              ],
              correct_answer: "C",
            },
            {
              id: 9,
              type: "nghe_3_hinh",
              choices: [
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image271.png", text: "A" },
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image212.png", text: "B"  },
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image225.png", text: "C" }
              ],
              correct_answer: "A",
            },
            {
              id: 10,
              type: "nghe_3_hinh",
              choices: [
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image134.png", text: "A" },
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image314.png", text: "B"  },
                { src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image285.png", text: "C" }
              ],
              correct_answer: "C",
            },
            {
              id: 11,
              type: "nghe_common_choices",
              choices_ref: "common_choices",
              correct_answer: "D",
            },
            {
              id: 12,
              type: "nghe_common_choices",
              choices_ref: "common_choices",
              correct_answer: "B",
            },
            {
              id: 13,
              type: "nghe_common_choices",
              choices_ref: "common_choices",
              correct_answer: "A",
            },
            {
              id: 14,
              type: "nghe_common_choices",
              choices_ref: "common_choices",
              correct_answer: "E",
            },
            {
              id: 15,
              type: "nghe_common_choices",
              choices_ref: "common_choices",
              correct_answer: "F",
            },
            {
              id: 16,
              type: "nghe_text",
              choices: [
                  { A: "他的 (tā de)" },
                  { B: "我的 (wǒ de)" },
                  { C: "同学的 (tóngxué de)" }
                ],
              correct_answer: "B",
            },
            {
              id: 17,
              type: "nghe_text",
              choices: [
                  { A: "星期三 (xīngqīsān)" },
                  { B: "星期五 (xīngqīwǔ)" },
                  { C: "星期六 (xīngqīliù)" }
                ],
              correct_answer: "B",
            },
            {
              id: 18,
              type: "nghe_text",
              choices: [
                  { A: "5" },
                  { B: "15" },
                  { C: "50" }
                ],
              correct_answer: "C",
            },
            {
              id: 19,
              type: "nghe_text",
              choices: [
                  { A: "茶 (chá)" },
                  { B: "苹果 (píngguǒ)" },
                  { C: "杯子 (bēizi)" }
                ],
              correct_answer: "C",
            },
            {
              id: 20,
              type: "nghe_text",
              choices: [
                  { A: "爱学习 (ài xuéxí)" },
                  { B: "很漂亮 (hěn piàoliang)" },
                  { C: "想回家 (xiǎng huí jiā)" }
                ],
              correct_answer: "B",
            },
          ],
        },
        reading: {
          questions: [
            {
              id: 21,
              type: "doc_hinh_anh",
              question: "写 (xiě)",
              choices: [{ A: "True" }, { B: "False" }],
              correct_answer: "A",
              image: "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image287.png",
            },
            {
              id: 22,
              type: "doc_hinh_anh",
              question: "听 (tīng)",
              choices: [{ A: "True" }, { B: "False" }],
              correct_answer: "A",
              image: "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image317.png",
            },
            {
              id: 23,
              type: "doc_hinh_anh",
              question: "菜 (cài)",
              choices: [{ A: "True" }, { B: "False" }],
              correct_answer: "B",
              image: "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image198.png",
            },
            {
              id: 24,
              type: "doc_hinh_anh",
              question: "他 (tā)",
              choices: [{ A: "True" }, { B: "False" }],
              correct_answer: "B",
              image: "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image79.png",
            },
            {
              id: 25,
              type: "doc_hinh_anh",
              question: "狗 (gǒu)",
              choices: [{ A: "True" }, { B: "False" }],
              correct_answer: "A",
              image: "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image265.png",
            },
            {
              id: 26,
              type: "doc_common_choices",
              question: "你好，我能吃一块儿吗？ (Nǐ hǎo, wǒ néng chī yī kuài er ma?)",
              choices_ref: "common_choices",
              correct_answer: "D",
            },
            {
              id: 27,
              type: "doc_common_choices",
              question: "她们在买衣服呢。(Tāmen zài mǎi yīfú ne.)",
              choices_ref: "common_choices",
              correct_answer: "F",
            },
            {
              id: 28,
              type: "doc_common_choices",
              question: "天气太热了，多吃些水果。(Tiānqì tài rè le, duō chī xiē shuǐguǒ.)",
              choices_ref: "common_choices",
              correct_answer: "C",
            },
            {
              id: 29,
              type: "doc_common_choices",
              question: "来，我们看看里面是什么东西。(Lái, wǒmen kànkan lǐmiàn shì shénme dōngxī.)",
              choices_ref: "common_choices",
              correct_answer: "A",
            },
            {
              id: 30,
              type: "doc_common_choices",
              question: "喂，你睡觉了吗？(Wèi, nǐ shuìjiào le ma?)",
              choices_ref: "common_choices",
              correct_answer: "B",
            },
            {
              id: 31,
              type: "doc_common_choices",
              question: "那个 人 是 谁？(Nà ge rén shì shuí?)",
              choices_ref: "common_choices",
              correct_answer: "C",
            },
            {
              id: 32,
              type: "doc_common_choices",
              question: "他 女儿 多 大 了？(Tā nǚ'ér duō dà le?)",
              choices_ref: "common_choices",
              correct_answer: "D",
            },
            {
              id: 33,
              type: "doc_common_choices",
              question: "你的 同学 在 哪儿 工作？(Nǐ de tóngxué zài nǎr gōngzuò?)",
              choices_ref: "common_choices",
              correct_answer: "A",
            },
            {
              id: 34,
              type: "doc_common_choices",
              question: "昨天 上午 天气 怎么样？(Zuótiān shàngwǔ tiānqì zěnme yàng?)",
              choices_ref: "common_choices",
              correct_answer: "B",
            },
            {
              id: 35,
              type: "doc_common_choices",
              question: "爸爸 什么时候 来 北京 呢？(Bàba shénme shíhòu lái Běijīng ne?)",
              choices_ref: "common_choices",
              correct_answer: "E",
            },
            {
              id: 36,
              type: "doc_common_choices",
              question: "昨天是 8 ( ) 19 日。(Zuótiān shì 8 () 19 rì.)",
              choices_ref: "common_choices",
              correct_answer: "F",
            },
            {
              id: 37,
              type: "doc_common_choices",
              question: "那个 饭馆儿 在 火车站 ( )。(Nà ge fànguǎn er zài huǒchē zhàn ().)",
              choices_ref: "common_choices",
              correct_answer: "B",
            },
            {
              id: 38,
              type: "doc_common_choices",
              question: "你 会 说 ( ) 吗？(Nǐ huì shuō () ma?)",
              choices_ref: "common_choices",
              correct_answer: "E",
            },
            {
              id: 39,
              type: "doc_common_choices",
              question: "男: 你好！王先生 在 吗？(Nán: Nǐ hǎo! Wáng xiānshēng zài ma?) </br> 女: 在， 请 ( )，我 去 叫 他。(Nǚ: Zài, qǐng (), wǒ qù jiào tā.)",
              choices_ref: "common_choices",
              correct_answer: "A",
            },
            {
              id: 40,
              type: "doc_common_choices",
              question: "女: 对不起，我 不 会 做 饭。(Nǚ: Duìbùqǐ, wǒ bù huì zuò fàn.) </br> 男: ( )，我 会。(Nán: (), wǒ huì.)",
              choices_ref: "common_choices",
              correct_answer: "C",
            },
          ],
        },
      },
    },
  ];
  
  export default hsk1QuizData;
  