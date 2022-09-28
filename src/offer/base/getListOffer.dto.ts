import { ApiProperty } from "@nestjs/swagger";
import { Offer } from "./Offer";
export class getListOfferDto {
  @ApiProperty({
    type: [Offer],
  })
  readonly paginatedResult!: [Offer];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
