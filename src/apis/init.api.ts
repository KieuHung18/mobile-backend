import express from "express";
import Admin from "./admin/admin.api";
import Client from "./client/client.api";
import Authentication from "./auth/authentication.api";
import Upload from "./upload/upload.api";
import authUser from "../middlewares/auth.middleware";

import session from "../middlewares/session.middleware";
import Gallery from "./gallery/gallery.api";

const Apis = express.Router();

Apis.use(session);
Apis.use("/gallery", Gallery);
Apis.use("/auth", Authentication);
Apis.use(authUser);
Apis.use("/users", Client);
Apis.use("/admin", Admin);
Apis.use("/upload", Upload);
export default Apis;
