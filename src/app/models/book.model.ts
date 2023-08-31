import { VolumeInfo } from './volume.model';

export interface Book {
  id: string;
  volumeInfo?: VolumeInfo;
}
