export interface Track {
  id: number;
  title: string;
  artist: string;
  type: 'audio' | 'youtube';
  audioUrl?: string;
  videoUrl?: string;
}