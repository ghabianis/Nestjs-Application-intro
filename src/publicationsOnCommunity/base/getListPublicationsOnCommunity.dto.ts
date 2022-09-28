import { ApiProperty } from "@nestjs/swagger";
import { PublicationsOnCommunity } from "./PublicationsOnCommunity";
export class getListPublicationsOnCommunityDto {
  @ApiProperty({
    type: [PublicationsOnCommunity],
  })
  readonly paginatedResult!: [PublicationsOnCommunity];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
