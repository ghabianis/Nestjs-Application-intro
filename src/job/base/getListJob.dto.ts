import { ApiProperty } from "@nestjs/swagger";
import { Job } from "./Job";
export class getListJobDto {
  @ApiProperty({
    type: [Job],
  })
  readonly paginatedResult!: [Job];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
