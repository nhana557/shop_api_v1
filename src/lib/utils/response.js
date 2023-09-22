import httpStatus from "http-status";

const headers = { Content_Type: 'application/json' };

export const successResponse = (data, status = httpStatus.OK, pagination = undefined) => {
    const response = {
        headers,
        statusCode: status,
        body: { data, pagination },
    };
    return response;
};

export const errorResponse = (status = 400, message) => {
    const response = {
        headers,
        statusCode: status,
        body: { message },
    };
    return response;
};