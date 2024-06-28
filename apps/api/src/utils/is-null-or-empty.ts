function isNullOrEmpty(value: any): boolean {
    if (typeof value == 'undefined') {
        return true;
    } else if (value === null) {
        return true;
    } else if (typeof value == 'string') {
        return (value || '').length == 0;
    } else if (typeof value == 'boolean' || typeof value == 'number') {
        return false;
    } else if (typeof value == 'object') {
        if (Array.isArray(value)) {
            // check empty array
            return value.length == 0;
        }

        // Check empty object
        if (Object.keys(value).length === 0 && value.constructor === Object) {
            return true;
        }
    }
    return false;
}

export { isNullOrEmpty };
