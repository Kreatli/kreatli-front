export const VALIDATION_RULES = {
  EMAIL: { required: true, maxLength: 200, pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i },
  PASSWORD: { required: true, maxLength: 200 },
};
