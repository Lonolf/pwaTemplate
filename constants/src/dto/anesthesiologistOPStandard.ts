import { PreExistingCondition, Measures, OpStandardPosition_Name, AnesthesiologicalService } from '../enums'
import { AnesthesiologistOpStandard, OpStandardMaterial } from '../types'

export type AnesthesiologistOpStandardQueryKeys = keyof Pick<
  AnesthesiologistOpStandard,
  'name' | 'anesthesiologistOpStandardId' | 'validFrom'
>

type QueryAnesthesiologistOpStandardDtoInterface = {
  search?: string
  sortBy: AnesthesiologistOpStandardQueryKeys
  sortOrder: 'desc' | 'asc'
  limit: number
  page: number
}

export class QueryAnesthesiologistOpStandardDto implements QueryAnesthesiologistOpStandardDtoInterface {
  search?: string | undefined
  validFrom?: Date | undefined
  sortBy!: 'name' | 'anesthesiologistOpStandardId' | 'validFrom'
  sortOrder!: 'desc' | 'asc'
  limit!: number
  page!: number
}

export class CreateAnesthesiologistOpStandardDto
  implements Omit<AnesthesiologistOpStandard, 'anesthesiologistOpStandardId'>
{
  name!: string
  validFrom!: Date
  createdBy!: string
  preExistingConditions!: PreExistingCondition[]
  interoperativeMeasure!: Measures[]
  materials!: OpStandardMaterial[]
  medications!: OpStandardMaterial[]
  ventilationMaterials!: OpStandardMaterial[]
  positions!: OpStandardPosition_Name[]
  requiredServices!: AnesthesiologicalService[]
}

export class UpdateAnesthesiologistOpStandardDto implements AnesthesiologistOpStandard {
  anesthesiologistOpStandardId!: string
  name!: string
  validFrom!: Date
  createdBy!: string
  preExistingConditions!: PreExistingCondition[]
  interoperativeMeasure!: Measures[]
  materials!: OpStandardMaterial[]
  medications!: OpStandardMaterial[]
  ventilationMaterials!: OpStandardMaterial[]
  positions!: OpStandardPosition_Name[]
  requiredServices!: AnesthesiologicalService[]
}
