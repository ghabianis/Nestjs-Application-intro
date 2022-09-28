import { ApiProperty } from "@nestjs/swagger";
import { Event } from "./Event";
export class getListEventDto {
  @ApiProperty({
    type: [Event],
  })
  readonly paginatedResult!: [Event];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
