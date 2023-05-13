export class CreateUserDto {
  public firstname!: string
  public lastname!: string
  public isVerified!: boolean
  public email!: string
  public phoneNumber!: number
  public roleAssociations!: string[]
}

export class EditUserDto {
  public firstname!: string
  public pendingResetToken?: string
  public lastname!: string
  public isVerified!: boolean
  public email!: string
  public phoneNumber!: number
  public roleAssociations!: string[]
  public status!: string
}

export class GetUsersQueryDto {
  public search?: string
}
