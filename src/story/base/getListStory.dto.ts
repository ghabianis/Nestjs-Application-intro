import { ApiProperty } from "@nestjs/swagger";
import { Story } from "./Story";
export class getListStoryDto {
  @ApiProperty({
    type: [Story],
  })
  readonly paginatedResult!: [Story];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
