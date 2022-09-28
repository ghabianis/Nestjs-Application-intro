import { ApiProperty } from "@nestjs/swagger";
import { UsersOnCommunity } from "./UsersOnCommunity";
export class getListUsersOnCommunityDto {
  @ApiProperty({
    type: [UsersOnCommunity],
  })
  readonly paginatedResult!: [UsersOnCommunity];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
