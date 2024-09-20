const returnError = (statusCode: number, message: string) => {
    const response = {
        statusCode,
        response: {
            success: false,
            responseCode: statusCode,
            message,
        },
    };
    return response;
};
const returnValidationError = (statusCode: number, message: { [key: string]: string }[] | undefined) => {
    const response = {
        statusCode,
        response: {
            success: false,
            responseCode: statusCode,
            message,
        },
    };
    return response;
};
const returnSuccess = (statusCode: number, message: string, data?: [] | object) => {
    const response = {
        statusCode,
        response: {
            success: true,
            message,
            responseCode: statusCode,
            data,
        },
    };
    return response;
};

export default {
    returnSuccess,
    returnError,
    returnValidationError
}