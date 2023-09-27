"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const apiResponse_1 = require("./apiResponse");
const node_fetch_1 = __importDefault(require("node-fetch"));
const fetchData = async (data) => {
    const makingApiCall = await (0, node_fetch_1.default)(data.url);
    const extractResponse = await makingApiCall.json();
    if ((0, apiResponse_1.isApiResponse)(extractResponse)) {
        return extractResponse;
    }
    else {
        console.log("Invalid API response");
    }
};
exports.fetchData = fetchData;
//# sourceMappingURL=apiCalling.js.map