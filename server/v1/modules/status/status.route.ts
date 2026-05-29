import { Hono } from "hono";
import { StatusController } from "@/server/v1/modules/status/status.controller";

const status = new Hono();

status.get("/installs", StatusController.handleGetStatusInstall);

export default status;
