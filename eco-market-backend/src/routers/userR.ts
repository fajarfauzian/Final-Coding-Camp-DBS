import express from "express";
import {
  authentification,
  changeProfile,
  createUser,
  deleteUser,
  getAlluser,
  updateUser,
  getProfile,
} from "../controllers/userC";
import {
  verifyAddUser,
  verifyAuthentification,
  verifyUpdateUser,
} from "../middlewares/verifyUser";
import uploadFileUser from "../middlewares/userUpload";
import { verifyToken, verifyRole } from "../middlewares/authorization";

const app = express();
app.use(express.json());

app.get(`/`, getAlluser);
app.post(
  `/create`,
  [uploadFileUser.single("picture"), verifyAddUser],
  createUser
);
app.put(
  `/:id`,
  [
    verifyToken,
    verifyRole(["ADMIN"]),
    uploadFileUser.single("picture"),
    verifyUpdateUser,
  ],
  updateUser
);
app.post(`/login`, [verifyAuthentification], authentification);
app.put(`/pic/:id`, [uploadFileUser.single("picture")], changeProfile);
app.delete(`/:id`, deleteUser);
app.get(`/profile`, verifyToken, getProfile);

export default app;
