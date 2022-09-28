import { ApiProperty } from "@nestjs/swagger";
import { UsersOnEntreprise } from "./UsersOnEntreprise";
export class getListUsersOnEntrepriseDto {
  @ApiProperty({
    type: [UsersOnEntreprise],
  })
  readonly paginatedResult!: [UsersOnEntreprise];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
