import { ApiProperty } from "@nestjs/swagger";
import { Chatroom } from "./Chatroom";
export class getListChatroomDto {
  @ApiProperty({
    type: [Chatroom],
  })
  readonly paginatedResult!: [Chatroom];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
