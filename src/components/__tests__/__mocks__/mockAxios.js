import { JsonWebTokenError } from "jsonwebtoken";

export default () => {
    post: jest.fn(() => { Promise.resolve({ data: {} }) })
};