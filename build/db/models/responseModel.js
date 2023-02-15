"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultGenerator = exports.ErrorGenerator = void 0;
function ErrorGenerator(stat, error, message) {
    let errorObj = {
        status: stat,
        error: error,
        message: message
    };
    return errorObj;
}
exports.ErrorGenerator = ErrorGenerator;
function ResultGenerator(stat, data, message) {
    let respObj = {
        status: stat,
        data: data,
        message: message
    };
    return respObj;
}
exports.ResultGenerator = ResultGenerator;
