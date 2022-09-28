import { ApiProperty } from "@nestjs/swagger";
import { Post } from "./Post";
export class getListPostDto {
  @ApiProperty({
    type: [Post],
  })
  readonly paginatedResult!: [Post];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
