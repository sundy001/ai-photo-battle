import jellyImage from "./images/jelly.png";
import sheepAI from "./images/sheepAI.png";
import sheepReal from "./images/sheepReal.jpg";
import playAI from "./images/playAI.jpg";
import playReal from "./images/playReal.jpg";
import cityAI from "./images/cityAI.jpg";
import cityReal from "./images/cityReal.jpg";
import deakAI from "./images/deakAI.jpg";
import deskReal from "./images/deskReal.jpg";
import groupAI from "./images/groupAI.jpg";
import groupReal from "./images/groupReal.jpg";
import houseAI from "./images/houseAI.jpg";
import hourseReal from "./images/hourseReal.jpg";
import coupleAI from "./images/coupleAI.jpeg";
import coupleReal from "./images/coupleReal.jpg";

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
    // {
    //   realPhoto: sheepReal,
    //   aiPhoto: sheepAI,
    //   aiPosition: "bottom",
    // },
    // {
    //   realPhoto: playReal,
    //   aiPhoto: playAI,
    //   aiPosition: "top",
    // },
    // {
    //   realPhoto: cityReal,
    //   aiPhoto: cityAI,
    //   aiPosition: "bottom",
    // },
    // {
    //   realPhoto: deskReal,
    //   aiPhoto: deakAI,
    //   aiPosition: "top",
    // },
    // {
    //   realPhoto: groupReal,
    //   aiPhoto: groupAI,
    //   aiPosition: "bottom",
    // },
    // {
    //   realPhoto: hourseReal,
    //   aiPhoto: houseAI,
    //   aiPosition: "top",
    // },
    {
      realPhoto: coupleReal,
      aiPhoto: coupleAI,
      aiPosition: "bottom",
    },
  ],

  ending: {
    photo: jellyImage,
    messagesFirst: [
      "「等等…這張照片不是 AI 生成的。」",
      "「這是真實的發生的事情。」",
      "「Jelly 被綁架了…」",
    ],
    messagesSecond: [
      "「從照片裡的線索，找出她被藏在哪裡…」",
      "「然後揪出幕後黑手。」",
      "「你的任務，從現在開始。」",
    ],
  },
};
