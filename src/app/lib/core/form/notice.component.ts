import { INotice } from "./interfaces/index";

export class Notice implements INotice {
	label:string;
	notice:string;
	value:object;
}
