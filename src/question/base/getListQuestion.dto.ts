import { ApiProperty } from "@nestjs/swagger";
import { Question } from "./Question";
export class getListQuestionDto {
  @ApiProperty({
    type: [Question],
  })
  readonly paginatedResult!: [Question];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
