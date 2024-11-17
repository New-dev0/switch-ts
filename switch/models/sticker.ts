export interface Sticker {
  id: string;
  setId: string;
  emoji?: string;
  fileId?: string;
  width?: number;
  height?: number;
  isAnimated?: boolean;
  isVideo?: boolean;
  type?: string;
  thumbnail?: {
    fileId: string;
    width: number;
    height: number;
  };
  thumbUrl?: string;
  setName?: string;
  maskPosition?: {
    point: string;
    xShift: number;
    yShift: number;
    scale: number;
  };
  customEmojiId?: string;
  needsRepainting?: boolean;
  premiumAnimation?: {
    fileId: string;
    width: number;
    height: number;
  };
} 