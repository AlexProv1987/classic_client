import { FormField } from "../common/interfaces";

interface ValidationResult {
    valid: boolean;
    validation_message: string;
}

export class ClsFormValidation {

    private hasErrors: boolean;

    constructor() {
        this.hasErrors = false
    }

    public runValidation = (objArr: Array<FormField>, callbackFnc: Function) => {
        for (const obj of objArr) {

            obj.is_valid = true
            obj.validation_message = ''

            if (obj.required && obj.value.length === 0) {
                obj.is_valid = false
                obj.validation_message = `${obj.label} is Required.`
            }
            if (obj.validation_fnc && obj.is_valid) {
                let fncResult;
                switch (obj.validation_fnc) {
                    case 'isMinLength':
                        fncResult = this.isMinLength(obj.value, obj.min_length);
                        obj.is_valid = fncResult.valid
                        obj.validation_message = `${obj.label} ${fncResult.validation_message}`
                        break;
                    case 'isOverMaxLength':
                        fncResult = this.isOverMaxLength(obj.value, obj.min_length);
                        obj.is_valid = fncResult.valid
                        obj.validation_message = `${obj.label} ${fncResult.validation_message}`
                        break;
                    default:
                        break
                }
            }
        }

        this.isFormValid(objArr)
        callbackFnc([...objArr])

    }

    public isFormValid = (objArr: Array<FormField>) => {
        this.hasErrors = false
        for (const obj of objArr) {
            if (obj.is_valid === false) {
                this.hasErrors = true
            }
        }
    }

    public isMinLength = (value: string, requiredLength: number): ValidationResult => {
        if (!value || value.length < requiredLength) {
            return { valid: false, validation_message: `is less than ${requiredLength} characters` };
        } else {
            return { valid: true, validation_message: '' };
        }
    }

    public isOverMaxLength = (value: string, maxLength: number): ValidationResult => {
        if (value.length > maxLength) {
            return { valid: false, validation_message: `exceeds ${maxLength} characters` };
        } else {
            return { valid: true, validation_message: '' };
        }
    }

    public fieldsMatch = (value: string, to_match: string): boolean => {
        if (value !== to_match) {
            return false
        } else {
            return true
        }
    }

    public getHasErrors = (): boolean => {
        return this.hasErrors
    }
}

export const getFormDataForRequest = (form: FormField[]): Record<string, string> => {
    const formRequestData = form.reduce((request: Record<string, string>, field) => {
        request[field.label_value] = field.value;
        return request;
    }, {});
    return formRequestData;
};