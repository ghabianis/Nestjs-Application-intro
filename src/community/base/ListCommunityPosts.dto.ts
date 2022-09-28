import { ApiProperty } from "@nestjs/swagger";
import { CommunityPosts } from "./CommunityPosts";
export class ListCommunityPosts {
  @ApiProperty({
    type: [CommunityPosts],
  })
  readonly paginatedResult!: [CommunityPosts];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}