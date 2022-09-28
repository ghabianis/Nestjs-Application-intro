import { ApiProperty } from "@nestjs/swagger";
import { EntreprisesOnCommunity } from "./EntreprisesOnCommunity";
export class getListEntreprisesOnCommunityDto {
  @ApiProperty({
    type: [EntreprisesOnCommunity],
  })
  readonly paginatedResult!: [EntreprisesOnCommunity];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
