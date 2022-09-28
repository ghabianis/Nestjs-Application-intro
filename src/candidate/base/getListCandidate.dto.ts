import { ApiProperty } from "@nestjs/swagger";
import { Candidate } from "./Candidate";
export class getListCandidateDto {
  @ApiProperty({
    type: [Candidate],
  })
  readonly paginatedResult!: [Candidate];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
