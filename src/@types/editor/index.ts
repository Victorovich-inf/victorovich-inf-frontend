enum Position {
  Left = "left",
  Center = "center",
  Right = "right",
}

export interface Video {
  video: string;
}

export interface ContentData {
  element: Video,
  options: {
    position: Position
  }
}
