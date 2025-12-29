export interface RockTrack {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: number;
  year?: string;
  externalUrl?: string;
}

export interface MBRecording {
  id: string;
  title: string;
  length?: number;
  'artist-credit'?: { name: string }[];
  firstrelease_date?: string;
  releases?: { title: string }[];
}

export interface MBRecordingResponse {
  recordings?: MBRecording[];
}
