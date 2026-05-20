
// This is a temporary helper function to format the phone number
// just for Indonesian phone numbers only that starting with "62".
export const formatPhone = (phone: string) => {
        const dialCode = phone.slice(0, 2);
        if(phone.startsWith("62")) {
            return `+${dialCode} ${phone.slice(2)}`;
    }
}