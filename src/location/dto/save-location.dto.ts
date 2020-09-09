import { IsString } from 'class-validator';

export class SaveLocationDTO {
  @IsString()
  location: string;

  @IsString()
  timestamp: string;
}
