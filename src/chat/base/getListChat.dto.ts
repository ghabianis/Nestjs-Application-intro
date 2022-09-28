import { ApiProperty } from "@nestjs/swagger";
import { Chat } from "./Chat";
export class getListChatDto {
  @ApiProperty({
    type: [Chat],
  })
  readonly paginatedResult!: [Chat];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
