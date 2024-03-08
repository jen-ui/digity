import express from "express";
import { getPayLoadClient } from "./get-pay-load-client";
import { nextApp, nextHandler } from "./next-utils";
import payload from "payload";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  const payLoad = getPayLoadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL}`);
      },
    },
  });

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js is started");

    app.listen(PORT, async () => {
      payload.logger.info(`Next.js app URL:${process.env.NEXT_PUBLIC_SERVER_URL}`)
    })
  });
};

start();
