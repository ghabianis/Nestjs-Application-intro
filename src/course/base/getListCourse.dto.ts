import { ApiProperty } from "@nestjs/swagger";
import { Course } from "./Course";
export class getListCourseDto {
  @ApiProperty({
    type: [Course],
  })
  readonly paginatedResult!: [Course];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
