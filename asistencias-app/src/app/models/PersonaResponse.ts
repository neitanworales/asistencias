import { DefaultResponse } from "./DefaultResponse";
import { Persona } from "./Persona";

export class PersonaResponse extends DefaultResponse {
    personas!: Persona[]
}