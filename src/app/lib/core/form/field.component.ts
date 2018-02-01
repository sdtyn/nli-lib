import { IField } from "./interfaces/index";

export class Field implements IField {
	label:string;
	notice:string;
	value:object;
}