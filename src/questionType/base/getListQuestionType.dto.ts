import { ApiProperty } from "@nestjs/swagger";
import { QuestionType } from "./QuestionType";
export class getListQuestionTypeDto {
  @ApiProperty({
    type: [QuestionType],
  })
  readonly paginatedResult!: [QuestionType];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
