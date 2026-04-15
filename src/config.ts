export interface Question {
  realPhoto: string;
  aiPhoto: string;
  /** Which side the AI photo appears on: "top" or "bottom" */
  aiPosition: "top" | "bottom";
}

export interface GameConfig {
  title: string;
  tagline: string;
  questionHeader: string;
  correctText: string;
  wrongText: string;
  questions: Question[];
  ending: {
    photo: string;
    messagesFirst: string[];
    messagesSecond: string[];
  };
}

const placeholder = (text: string) =>
  `https://placehold.co/600x400/000000/FFFFFF/png?text=${encodeURIComponent(text)}`;

export const config: GameConfig = {
  title: "Real or AI?",
  tagline: "Can you tell the difference?",
  questionHeader: "Which photo is AI-generated?",

  correctText: "Correct!",
  wrongText: "Wrong!",

  questions: [
    {
      realPhoto: placeholder("Q1 Real"),
      aiPhoto: placeholder("Q1 AI"),
      aiPosition: "bottom",
    },
    {
      realPhoto: placeholder("Q2 Real"),
      aiPhoto: placeholder("Q2 AI"),
      aiPosition: "top",
    },
    {
      realPhoto: placeholder("Q3 Real"),
      aiPhoto: placeholder("Q3 AI"),
      aiPosition: "bottom",
    },
    {
      realPhoto: placeholder("Q4 Real"),
      aiPhoto: placeholder("Q4 AI"),
      aiPosition: "top",
    },
    {
      realPhoto: placeholder("Q5 Real"),
      aiPhoto: placeholder("Q5 AI"),
      aiPosition: "bottom",
    },
    {
      realPhoto: placeholder("Q6 Real"),
      aiPhoto: placeholder("Q6 AI"),
      aiPosition: "top",
    },
  ],

  ending: {
    photo: placeholder("Ending"),
    messagesFirst: [
      "「等等…這張照片不是 AI 生成的。」",
      "「這是真實的記憶。」",
      "「Jelly 被困了…」",
    ],
    messagesSecond: [
      "「她把求救信息交給了一份禮物…」",
      "「你的任務，從現在開始。」",
    ],
  },
};
