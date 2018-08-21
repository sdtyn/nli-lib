
# NLIDateField

### Angular Date Picker

### Description

Compatible with Angular5 version.

Online demo is here


### Installation
To install this component to an external project, follow the procedure:

1. npm install nli-datefield --save

2. Run npm install in project folder (The home folder that `package.json` exists): `npm install` This command downloads all dependencies including `@next-level-integration/nli-datefield`. You can also download just this module with: npm install `@next-level-integration/nli-datefield`

5. Import input module to your project. In your main module (or module that you want use this component) that its default name is `app.module.ts`, import it:

		import { NLIDateFieldModule } from '@next-level-integration/nli-datefield/datefield.module';
		...
		@NgModule({
		  ...
		  imports: [
		    ...
		    NLIDateFieldModule
		   ]
		   ...
		});

4. Add the following snippet inside your template:

		<nli-datefield [configs]="options"
				 label="Date"
				 [selectedDate]="tomorrow"
				 (changed)="onChange($event)"></nli-datefield>


### Attributes

Value of the options attribute is a type of DateFieldOptions. It can contain the following properties.


| Option        | Default       | Type  | Description |
| ------------- |:-------------| :-----| :-----------|
| currentDate   | 	Today	 			| Date  | Default is displayed the date on Date picker |
| selectableRange | new DateRange(null, null)      |   DateRange | Selectable date span |
| filterMode | false      |    Boolean | The range picker is activated with this option |
| selectedRange | new DateRange(null, null) |  DateRange | If filterMode activated, then you can select a default range on range picker.  |
| locale | "en-US" |    String | It supports german and english for now |
| labels | null      |    Array | If you want to translate the labels you can use this option. Usage: 	[{key:KEY, label:"LABEL"}]. |
| required | false      |    Boolean | If the date is required |
| readOnly | false      |    Boolean | If the date picker is readOnly |


Example of the options data (not all properties listed):

	var labels:Array<any> = [{key:DateUtils.ERROR_DATE_IS_NOT_SELECTABLE_RANGE, label:"Das Mindestalter für einen Vertragsabschluss ist 18 Jahre."}];

	public options:DateFieldOptions = new DateFieldOptions().setOptions(false, new Date(2000, 1, 1), new DateRange(null, new Date(1999, 11, 31)), null, "de-DE", labels, false, false);

### Callbacks

##### changed:
called when the date is selected, removed or input field typing is valid or on range picker a date range is selected.

### Examples
##### 1. Default date picker

in Template:

	<nli-datefield classes="width-120"[configs]="options"
					label="Datum"
					[selectedDate]="tomorrow"
					(changed)="onChange($event)"></nli-datefield>

in your component:

	public options:DateFieldOptions = new DateFieldOptions().setOptions(false, new Date(), new DateRange(null, null), null, "de-DE", null, true, false);


##### 2. Date picker with selectable range

	in Template:

		<nli-datefield [configs]="options"
									 label="Geburtsdatum"
									 [selectedDate]="null"
									 (changed)="onChange($event)"></nli-datefield>

	in your component:

		public options:DateFieldOptions = new DateFieldOptions().setOptions(false, new Date(2017, 5, 5), new DateRange(new Date(2018, 8, 6), new Date(2018, 8, 16)), null, "de-DE", null, true, true);


##### 3. Range picker

			in Template:

				<nli-datefield classes="width-250"  
									[configs]="options"
									label="Select a range"
									(changed)="onChange($event)"></nli-datefield>

			in your component:

				public options:DateFieldOptions = new DateFieldOptions().setOptions(true, new Date(), null, null, "en-US", null, false, false);


### Compatibility (tested with)

		Firefox (latest)
		Chrome (latest)
		Opera (latest)
		Edge
		IE11



# Issues

