import { JSX } from "react";

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

export interface NavItem<T = string> {
    key: T;
    icon: JSX.Element;
    label: string;
    requiredGroups: string[];
}