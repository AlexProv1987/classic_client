export interface Session {
  //lazy
  [key: string]: any;
};

export interface MultiSelectOption {
    value: string;
    label: string;
}

export interface FormField {
  label:string,
  label_value:string,
  value:string,
  is_valid:boolean, 
  validation_message:string,
  required:boolean, 
  validation_fnc?: string;
  min_length:number,
  max_length:number,
  [key: string]: any;
}