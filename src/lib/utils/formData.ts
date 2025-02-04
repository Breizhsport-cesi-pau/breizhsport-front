export const flatObjectForFormData = (item: object, parentKey = '', result = {} as any) => {
    for (const key in item) {
        const itemKey = key as keyof typeof item;
        const formKey = parentKey === '' ? key : `${parentKey}[${itemKey}]`;
        if (typeof item[itemKey] === 'object' && !((item[itemKey] as unknown) instanceof File)) {
            flatObjectForFormData(item[itemKey], formKey, result);
        } else {
            result[formKey] = item[itemKey];
        }
    }
    return result;
};
export const flatToFormData = (item: object) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(item)) {
        formData.append(key, value);
    }
    return formData;
};
