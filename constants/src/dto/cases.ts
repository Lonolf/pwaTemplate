export interface QueryCasesDto {
  fromTimestamp?: string
  toTimestamp?: string
  patientId?: string
}

export interface scheduleCaseDTO {
  caseId: string
  newOrId?: string
  newStatus: string
  newDate: Date
  withoutBackup: boolean
}

export interface lockWeekDto {
  weekTimestamp: number
}

export interface updateAnesthesiologistsDto {
  anesthesiologistsId: string[]
}

export interface updateMultipleCasesAnesthesiologistsDto {
  [caseId: string]: string[];
}
export interface associatePatientDto {
  caseId: string
  patientId: string
}
