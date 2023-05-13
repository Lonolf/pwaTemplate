import { ToastType } from '../enums'

export interface IToastBody {
  text: string
  type: ToastType
  targetPath?: string
}

export interface IToast extends IToastBody {
  id: string
}
