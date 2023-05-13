import { Address } from "../types";


export interface GetPatientsDto {
    cardInsuranceNumber?: string;
    name?: string;
    surname?: string;
    birthDate?: Date;
    address?: Address;
}
