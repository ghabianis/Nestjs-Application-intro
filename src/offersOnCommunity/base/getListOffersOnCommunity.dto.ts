import { ApiProperty } from "@nestjs/swagger";
import { OffersOnCommunity } from "./OffersOnCommunity";
export class getListOffersOnCommunityDto {
  @ApiProperty({
    type: [OffersOnCommunity],
  })
  readonly paginatedResult!: [OffersOnCommunity];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
