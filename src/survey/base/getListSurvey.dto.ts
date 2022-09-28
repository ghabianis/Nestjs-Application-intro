import { ApiProperty } from "@nestjs/swagger";
import { Survey } from "./Survey";
export class getListSurveyDto {
  @ApiProperty({
    type: [Survey],
  })
  readonly paginatedResult!: [Survey];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
