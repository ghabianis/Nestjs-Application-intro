import { ApiProperty } from "@nestjs/swagger";
import { Category } from "./Category";
export class getListCategoryDto {
  @ApiProperty({
    type: [Category],
  })
  readonly paginatedResult!: [Category];

  @ApiProperty({
    type: Number,
  })
  readonly totalCount!: number;
}
