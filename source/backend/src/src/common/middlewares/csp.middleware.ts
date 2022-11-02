import express from "express";
import helmet from "helmet";

export default (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  return helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        scriptSrc: ["'self'", `'nonce-${res.locals.nonce}'`],
        imgSrc: ["'self'", "data:", "blob:"],
        connectSrc: ["'self'", "ws://127.0.0.1:4000"],
        scriptSrcAttr: null,
        upgradeInsecureRequests: null,
      },
    },
  })(req, res, next);
};
