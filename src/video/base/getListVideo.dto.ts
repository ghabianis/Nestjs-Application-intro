import { ApiProperty } from "@nestjs/swagger";
import { Video } from "./Video";
export class getListVideoDto {
  @ApiProperty({
    type: [Video],
  })
  readonly paginatedResult!: [Video];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
