import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "src/api/auth";
import { expect, test } from "vitest";

// 1: No auth header
const req1: IncomingHttpHeaders = {};
test("No auth header", () => {
  expect(getAPIKey(req1)).toBe(null);
});

// 2: missing key or header
const req2a: IncomingHttpHeaders = {
  authorization: "ApiKey",
};
test("No apiley", () => {
  expect(getAPIKey(req2a)).toBe(null);
});

const req2b: IncomingHttpHeaders = {
  authorization: "12345",
};
test("No key headedr", () => {
  expect(getAPIKey(req2b)).toBe(null);
});

// 3: key is not api key
const req3: IncomingHttpHeaders = {
  authorization: "apikey 12345",
};
test("Wrong key header", () => {
  expect(getAPIKey(req3)).toBe(null);
});

// 4: 2 & 3
const req4: IncomingHttpHeaders = {
  authorization: "hello ApiKey 12345",
};
test("Wrong key header and length", () => {
  expect(getAPIKey(req4)).toBe(null);
});

// 5: right case
const req5: IncomingHttpHeaders = {
  authorization: "ApiKey 12345",
};
test("Right case", () => {
  expect(getAPIKey(req5)).toBe("12345");
});
