import { AlertVariant } from "./types";

export interface Session {
  //lazy
  [key: string]: any;
};

export interface AlertInfo {
  message: string;
  variant: AlertVariant;
  id:number,
}

export interface MultiSelectOption {
    value: string;
    label: string;
}
