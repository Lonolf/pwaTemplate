import { BadRequestException } from '@nestjs/common'
import { IUser } from '../types'

export class LoginRequestDto {
  email!: string
  password!: string
}

export class LoginResponseDto {
  user!: IUser
  accessToken!: string
}

export interface ValidationError {
  [key: string]: ValidationError | string[]
}

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: ValidationError) {
    super()
  }
}

export class ErrorDto {
  message!: string
  errors!: ValidationError
}

export class ResetPasswordRequestDto {
  password!: string
  token!: string
}

export class SendVerificationEmailRequestDto {
  email!: string
}
