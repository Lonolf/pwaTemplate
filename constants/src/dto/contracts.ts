import {
  BillingA,
  BillingB,
  BillingC1,
  BillingC2,
  BillingC3,
  BillingD,
  BillingE,
  BillingG,
  ContractDetail,
  Identifier,
  OpStandard,
  OpStandardBillingSection,
  OpStandardBookingSection,
  OpStandardIntraOpSection,
  OpStandardPostOpSection,
  OpStandardPreOpSection,
} from '../types'

export class CreateContractDto {
  readonly details!: ContractDetail
  readonly billingA?: BillingA
  readonly billingB?: BillingB
  readonly billingC1?: BillingC1
  readonly billingC2?: BillingC2
  readonly billingC3?: BillingC3
  readonly billingD?: BillingD
  readonly billingE?: BillingE
  readonly billingG?: BillingG
  readonly opStandards?: any
}

export class EditContractDto {
  readonly contractId!: string
  readonly details!: ContractDetail
  readonly billingA?: BillingA
  readonly billingB?: BillingB
  readonly billingC1?: BillingC1
  readonly billingC2?: BillingC2
  readonly billingC3?: BillingC3
  readonly billingD?: BillingD
  readonly billingE?: BillingE
  readonly billingG?: BillingG
  readonly opStandards?: any
}

export class QueryContractDto {
  readonly search?: string
  readonly dateRange?: (string | number)[]
  readonly status!: 'active' | 'expired' | 'all'
  readonly doctorId?: string
  readonly sortBy?: 'contractName' | 'validUntil' | 'validFrom' | 'status' | 'id'
  readonly sortOrder?: 'desc' | 'asc'
  readonly limit?: number
  readonly page?: number
}

export class QueryOpStandardDto {
  readonly search?: string
  readonly contractId?: string
  readonly sortBy?: 'contractName' | 'validUntil' | 'validFrom' | 'status' | 'id'
  readonly sortOrder?: 'desc' | 'asc'
  readonly limit?: number
  readonly page?: number
}

export class CreateOpStandardDto {
  name!: string
  previousContractOpStandardId?: Identifier | null

  subjectArea?: string
  surgeryDurationInMinutes?: number
  operatingRoomIds?: Identifier[]

  bookingSection?: OpStandardBookingSection
  preOpSection?: OpStandardPreOpSection
  intraOpSection?: OpStandardIntraOpSection
  postOpSection?: OpStandardPostOpSection
  billingSection?: OpStandardBillingSection
  changeRequest?: string

  contractId?: string
}

export class ResponseOpStandardDto extends CreateOpStandardDto {
  id?: string
  _id?: string
  __v?: string
  createdAt?: string
  updatedAt?: string
}
