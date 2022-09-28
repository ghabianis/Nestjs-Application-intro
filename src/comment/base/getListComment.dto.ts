import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "./Comment";
export class getListCommentDto {
  @ApiProperty({
    type: [Comment],
  })
  readonly paginatedResult!: [Comment];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
