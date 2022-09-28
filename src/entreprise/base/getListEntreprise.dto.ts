import { ApiProperty } from "@nestjs/swagger";
import { Entreprise } from "./Entreprise";
export class getListEntrepriseDto {
  @ApiProperty({
    type: [Entreprise],
  })
  readonly paginatedResult!: [Entreprise];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
