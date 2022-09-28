import { ApiProperty } from "@nestjs/swagger";
import { Contract } from "./Contract";
export class getListContractDto {
  @ApiProperty({
    type: [Contract],
  })
  readonly paginatedResult!: [Contract];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
