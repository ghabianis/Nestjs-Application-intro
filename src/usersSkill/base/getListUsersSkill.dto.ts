import { ApiProperty } from "@nestjs/swagger";
import { UsersSkill } from "./UsersSkill";
export class getListUsersSkillDto {
  @ApiProperty({
    type: [UsersSkill],
  })
  readonly paginatedResult!: [UsersSkill];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
