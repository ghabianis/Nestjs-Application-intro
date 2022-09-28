import { ApiProperty } from "@nestjs/swagger";
import { Recruiter } from "./Recruiter";
export class getListRecruiterDto {
  @ApiProperty({
    type: [Recruiter],
  })
  readonly paginatedResult!: [Recruiter];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
