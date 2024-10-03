import { ApiError } from '../middleware/errorHandler';

export function validateNumber(value: any, fieldName: string, min?: number, max?: number): number {
    const num = Number(value);
    if (isNaN(num)) {
        throw new ApiError(400, `Invalid ${fieldName}: must be a number`);
    }
    if (min !== undefined && num < min) {
        throw new ApiError(400, `Invalid ${fieldName}: must be at least ${min}`);
    }
    if (max !== undefined && num > max) {
        throw new ApiError(400, `Invalid ${fieldName}: must be at most ${max}`);
    }
    return num;
}

export function validateString(value: any, fieldName: string): string {
    if (typeof value !== 'string') {
        throw new ApiError(400, `Invalid ${fieldName}: must be a string`);
    }
    return value;
}
