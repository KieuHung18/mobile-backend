import express from "express";
import Admin from "./admin/admin.api";
import Client from "./client/client.api";
import Authentication from "./auth/authentication.api";
import Upload from "./upload/upload.api";
import Artwork from "./gallery/artwork.api";

import session from "../middlewares/session.middleware";

const Apis = express.Router();

Apis.use(session);
Apis.use("/artworks", Artwork);
Apis.use("/auth", Authentication);
Apis.use("/users", Client);
Apis.use("/admin", Admin);
Apis.use("/upload", Upload);
export default Apis;
