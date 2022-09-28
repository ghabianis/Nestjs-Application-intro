import { ApiProperty } from "@nestjs/swagger";
import { Publication } from "./Publication";
export class getListPublicationDto {
  @ApiProperty({
    type: [Publication],
  })
  readonly paginatedResult!: [Publication];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
