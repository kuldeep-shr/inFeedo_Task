"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAPIErrorResponse = exports.sendAPISuccessResponse = exports.isApiResponse = void 0;
// Type guard function
function isApiResponse(response) {
    return typeof response === "object" && response.length > 0;
}
exports.isApiResponse = isApiResponse;
function sendAPISuccessResponse(res, data, message) {
    const response = {
        success: true,
        message: message,
        data: data,
    };
    res.status(200).json(response);
}
exports.sendAPISuccessResponse = sendAPISuccessResponse;
function sendAPIErrorResponse(res, data, message) {
    const response = {
        success: false,
        message: message,
        data: [],
    };
    return res.status(400).json(response);
}
exports.sendAPIErrorResponse = sendAPIErrorResponse;
//# sourceMappingURL=apiResponse.js.map