const hsk1QuizData2 = [
  {
    exam: {
      level: 1,
      title: "Đề thi số 2",
      total_questions: 40,
      audio_file: "/assets/audio/hsk1-quiz1.mp3", // Reuse existing audio
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
      common_listening:
        "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image92.png",
      common_reading1:
        "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image293.png",
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
            correct_answer: "B",
            image:
              "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image174.png",
          },
          {
            id: 2,
            type: "nghe_hinh_anh",
            choices: [{ A: "True" }, { B: "False" }],
            correct_answer: "A",
            image:
              "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image235.png",
          },
          {
            id: 3,
            type: "nghe_hinh_anh",
            choices: [{ A: "True" }, { B: "False" }],
            correct_answer: "A",
            image:
              "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image267.png",
          },
          {
            id: 4,
            type: "nghe_hinh_anh",
            choices: [{ A: "True" }, { B: "False" }],
            correct_answer: "B",
            image:
              "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image116.png",
          },
          {
            id: 5,
            type: "nghe_hinh_anh",
            choices: [{ A: "True" }, { B: "False" }],
            correct_answer: "A",
            image:
              "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image300.png",
          },
          {
            id: 6,
            type: "nghe_3_hinh",
            choices: [
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image126.png",
                text: "A",
              },
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image114.png",
                text: "B",
              },
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image306.png",
                text: "C",
              },
            ],
            correct_answer: "B",
          },
          {
            id: 7,
            type: "nghe_3_hinh",
            choices: [
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image181.png",
                text: "A",
              },
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image26.png",
                text: "B",
              },
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image115.png",
                text: "C",
              },
            ],
            correct_answer: "B",
          },
          {
            id: 8,
            type: "nghe_3_hinh",
            choices: [
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image122.png",
                text: "A",
              },
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image246.png",
                text: "B",
              },
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image216.png",
                text: "C",
              },
            ],
            correct_answer: "A",
          },
          {
            id: 9,
            type: "nghe_3_hinh",
            choices: [
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image212.png",
                text: "A",
              },
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image271.png",
                text: "B",
              },
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image225.png",
                text: "C",
              },
            ],
            correct_answer: "C",
          },
          {
            id: 10,
            type: "nghe_3_hinh",
            choices: [
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image314.png",
                text: "A",
              },
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image134.png",
                text: "B",
              },
              {
                src: "https://study4.com/media/hsk_tests/images/HSK1Test/images/image285.png",
                text: "C",
              },
            ],
            correct_answer: "B",
          },
          {
            id: 11,
            type: "nghe_common_choices",
            choices_ref: "common_choices",
            correct_answer: "A",
          },
          {
            id: 12,
            type: "nghe_common_choices",
            choices_ref: "common_choices",
            correct_answer: "C",
          },
          {
            id: 13,
            type: "nghe_common_choices",
            choices_ref: "common_choices",
            correct_answer: "B",
          },
          {
            id: 14,
            type: "nghe_common_choices",
            choices_ref: "common_choices",
            correct_answer: "F",
          },
          {
            id: 15,
            type: "nghe_common_choices",
            choices_ref: "common_choices",
            correct_answer: "E",
          },
          {
            id: 16,
            type: "nghe_text",
            choices: [
              { A: "我的 (wǒ de)" },
              { B: "他的 (tā de)" },
              { C: "同学的 (tóngxué de)" },
            ],
            correct_answer: "A",
          },
          {
            id: 17,
            type: "nghe_text",
            choices: [
              { A: "星期五 (xīngqīwǔ)" },
              { B: "星期三 (xīngqīsān)" },
              { C: "星期六 (xīngqīliù)" },
            ],
            correct_answer: "A",
          },
          {
            id: 18,
            type: "nghe_text",
            choices: [{ A: "15" }, { B: "5" }, { C: "50" }],
            correct_answer: "A",
          },
          {
            id: 19,
            type: "nghe_text",
            choices: [
              { A: "苹果 (píngguǒ)" },
              { B: "茶 (chá)" },
              { C: "杯子 (bēizi)" },
            ],
            correct_answer: "A",
          },
          {
            id: 20,
            type: "nghe_text",
            choices: [
              { A: "老师 (lǎoshī)" },
              { B: "学生 (xuéshēng)" },
              { C: "朋友 (péngyǒu)" },
            ],
            correct_answer: "A",
          },
        ],
      },
      reading: {
        questions: [
          {
            id: 21,
            type: "doc_hinh_anh",
            choices: [{ A: "True" }, { B: "False" }],
            correct_answer: "A",
            image:
              "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image235.png",
          },
          {
            id: 22,
            type: "doc_hinh_anh",
            choices: [{ A: "True" }, { B: "False" }],
            correct_answer: "B",
            image:
              "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image174.png",
          },
          {
            id: 23,
            type: "doc_hinh_anh",
            choices: [{ A: "True" }, { B: "False" }],
            correct_answer: "A",
            image:
              "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image267.png",
          },
          {
            id: 24,
            type: "doc_hinh_anh",
            choices: [{ A: "True" }, { B: "False" }],
            correct_answer: "B",
            image:
              "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image116.png",
          },
          {
            id: 25,
            type: "doc_hinh_anh",
            choices: [{ A: "True" }, { B: "False" }],
            correct_answer: "A",
            image:
              "https://s4-media1.study4.com/media/hsk_tests/images/HSK1Test/images/image300.png",
          },
          {
            id: 26,
            type: "doc_common_choices",
            choices_ref: "common_reading1",
            correct_answer: "A",
          },
          {
            id: 27,
            type: "doc_common_choices",
            choices_ref: "common_reading1",
            correct_answer: "B",
          },
          {
            id: 28,
            type: "doc_common_choices",
            choices_ref: "common_reading1",
            correct_answer: "C",
          },
          {
            id: 29,
            type: "doc_common_choices",
            choices_ref: "common_reading1",
            correct_answer: "D",
          },
          {
            id: 30,
            type: "doc_common_choices",
            choices_ref: "common_reading1",
            correct_answer: "E",
          },
          {
            id: 31,
            type: "doc_common_choices",
            choices_ref: "common_reading2",
            correct_answer: "A",
          },
          {
            id: 32,
            type: "doc_common_choices",
            choices_ref: "common_reading2",
            correct_answer: "B",
          },
          {
            id: 33,
            type: "doc_common_choices",
            choices_ref: "common_reading2",
            correct_answer: "C",
          },
          {
            id: 34,
            type: "doc_common_choices",
            choices_ref: "common_reading2",
            correct_answer: "D",
          },
          {
            id: 35,
            type: "doc_common_choices",
            choices_ref: "common_reading2",
            correct_answer: "E",
          },
          {
            id: 36,
            type: "doc_common_choices",
            choices_ref: "common_reading3",
            correct_answer: "A",
          },
          {
            id: 37,
            type: "doc_common_choices",
            choices_ref: "common_reading3",
            correct_answer: "B",
          },
          {
            id: 38,
            type: "doc_common_choices",
            choices_ref: "common_reading3",
            correct_answer: "C",
          },
          {
            id: 39,
            type: "doc_common_choices",
            choices_ref: "common_reading3",
            correct_answer: "D",
          },
          {
            id: 40,
            type: "doc_common_choices",
            choices_ref: "common_reading3",
            correct_answer: "E",
          },
        ],
      },
    },
  },
];

export default hsk1QuizData2;
