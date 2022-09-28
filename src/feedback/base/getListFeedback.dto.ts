import { ApiProperty } from "@nestjs/swagger";
import { Feedback } from "./Feedback";
export class getListFeedbackDto {
  @ApiProperty({
    type: [Feedback],
  })
  readonly paginatedResult!: [Feedback];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
