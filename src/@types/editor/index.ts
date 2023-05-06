export enum TypeContent {
  VIDEO = "video",
  HTML = "html",
  FILE = "file",
  IMAGE = "image",
}

export enum Position {
  Left = "left",
  Center = "center",
  Right = "right",
}

export interface Video {
  video: string;
}

export interface Image {
  src: string;
}

export interface Html {
  html: any;
}

export interface File {
  file: string;
  name: string;
}

export interface ContentData {
  id: string;
  element: Video | Image | Html | File,
  settings: {
    justifyContent: Position
  }
}

export interface Content {
  [key: string]: {
    elements: ContentData[],
    public?: boolean;
  }
}

export interface DialogLesson {
  name: string;
  public: boolean;
}

export interface DialogTask {
  name: string;
  answer: string;
  prompt: string;
  taskSolutionText: string;
  public: boolean;
  answerFile: boolean;
  file: File | null;
}
