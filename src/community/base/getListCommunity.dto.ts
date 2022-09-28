import { ApiProperty } from "@nestjs/swagger";
import { Community } from "./Community";
export class getListCommunityDto {
  @ApiProperty({
    type: [Community],
  })
  readonly paginatedResult!: [Community];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
