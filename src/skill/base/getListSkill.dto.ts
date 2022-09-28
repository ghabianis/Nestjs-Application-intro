import { ApiProperty } from "@nestjs/swagger";
import { Skill } from "./Skill";
export class getListSkillDto {
  @ApiProperty({
    type: [Skill],
  })
  readonly paginatedResult!: [Skill];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
