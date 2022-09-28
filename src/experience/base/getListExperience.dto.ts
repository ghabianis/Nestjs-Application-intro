import { ApiProperty } from "@nestjs/swagger";
import { Experience } from "./Experience";
export class getListExperienceDto {
  @ApiProperty({
    type: [Experience],
  })
  readonly paginatedResult!: [Experience];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
