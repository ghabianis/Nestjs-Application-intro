import { ApiProperty } from "@nestjs/swagger";
import { CandidatesOnChatroom } from "./CandidatesOnChatroom";
export class getListCandidatesOnChatroomDto {
  @ApiProperty({
    type: [CandidatesOnChatroom],
  })
  readonly paginatedResult!: [CandidatesOnChatroom];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
