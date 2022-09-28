import { ApiProperty } from "@nestjs/swagger";
import { FollowEntreprise } from "./FollowEntreprise";
export class getListFollowEntrepriseDto {
  @ApiProperty({
    type: [FollowEntreprise],
  })
  readonly paginatedResult!: [FollowEntreprise];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
