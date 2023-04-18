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

export interface ContentData {
  id: string;
  element: Video | Image,
  settings: {
    justifyContent: Position
  }
}

export interface Content {
  [key: string]: {
    public: boolean;
    elements: ContentData[]
  }
}
