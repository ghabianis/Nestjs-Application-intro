import { ApiProperty } from "@nestjs/swagger";
import { Socialinterraction } from "./Socialinterraction";
import { StoriesMedia } from "./StoriesMedia";
export class getStoriesMediaListDto {
  @ApiProperty({
    type: [StoriesMedia],
  })
  readonly paginatedResult!: [StoriesMedia];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
