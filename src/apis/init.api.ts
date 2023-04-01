import express from "express";
import Admin from "./admin/admin.api";
import Client from "./client/client.api";
const Apis = express.Router();
Apis.use("/", Client);
Apis.use("/admin", Admin);
export default Apis;
