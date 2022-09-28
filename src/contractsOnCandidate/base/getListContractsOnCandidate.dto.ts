import { ApiProperty } from "@nestjs/swagger";
import { ContractsOnCandidate } from "./ContractsOnCandidate";
export class getListContractsOnCandidateDto {
  @ApiProperty({
    type: [ContractsOnCandidate],
  })
  readonly paginatedResult!: [ContractsOnCandidate];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
