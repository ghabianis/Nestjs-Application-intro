import { ApiProperty } from "@nestjs/swagger";
import { City } from "./City";
export class getListCityDto {
  @ApiProperty({
    type: [City],
  })
  readonly paginatedResult!: [City];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
