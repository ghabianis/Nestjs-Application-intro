import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { Socialinterraction } from "./Socialinterraction";
export class getListSocialinterractionDto {
  @ApiProperty({
    type: [Socialinterraction],
  })
  readonly paginatedResult!: [Socialinterraction];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
