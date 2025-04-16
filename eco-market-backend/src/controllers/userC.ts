import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL, SECRET } from "../global";
import fs from "fs";
import md5 from "md5";
import { sign } from "jsonwebtoken";
import { request } from "http";

const prisma = new PrismaClient({ errorFormat: "pretty" });

export const getAlluser = async (request: Request, response: Response) => {
  try {
    const { search } = request.query;
    const allUser = await prisma.user.findMany({
      where: { name: { contains: search?.toString() || "" } },
    });
    return response
      .json({
        status: true,
        data: allUser,
        message: `User has retrieved`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password, role } = request.body;
    const uuid = uuidv4();
    let filename = "";
    if (request.file) filename = request.file.filename;

    const newUser = await prisma.user.create({
      data: {
        uuid,
        name,
        email,
        password: md5(password),
        role,
        profile_picture: filename,
      },
    });

    return response
      .json({
        status: true,
        data: newUser,
        message: `New User has created`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `email already used, please change`,
      })
      .status(400);
  }
};

export const updateUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, email, password, role } = request.body;

    const findUser = await prisma.user.findFirst({
      where: { id: Number(id) },
    });
    if (!findUser)
      return response
        .status(200)
        .json({ status: false, message: `User is not found` });

    let filename = findUser.profile_picture;
    if (request.file) {
      /**update filename by new uploaded picture */
      filename = request.file.filename;
      /**check the old picture in the folder */
      let path = `${BASE_URL}/../public/profile_picture/${findUser.profile_picture}`;
      let exist = fs.existsSync(path);
      /**delet the old exist picture if reupload new file  */
      if (exist && findUser.profile_picture !== ``) fs.unlinkSync(path);
    }

    const updateUser = await prisma.user.update({
      data: {
        name: name || findUser.name,
        email: email || findUser.email,
        password: md5(password) || findUser.password,
        role: role || findUser.role,
        profile_picture: filename,
      },
      where: { id: Number(id) },
    });

    return response
      .json({
        status: true,
        data: updateUser,
        message: `User has updated`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `email already used, please change`,
      })
      .status(400);
  }
};

export const changeProfile = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const findUser = await prisma.user.findFirst({ where: { id: Number(id) } });
    if (!findUser)
      return response
        .status(200)
        .json({ status: false, message: `User with id ${id} is not found` });

    /** default value  filename of  saved data*/
    let filename = findUser.profile_picture;
    if (request.file) {
      /**update filename by new uploaded picture */
      filename = request.file.filename;
      /**check the old picture in the folder */
      let path = `${BASE_URL}/../public/profile_picture/${findUser.profile_picture}`;
      let exist = fs.existsSync(path);
      /**delet the old exist picture if reupload new file  */
      if (exist && findUser.profile_picture !== ``) fs.unlinkSync(path);
    }

    /**process to update picture  in database */
    const updateProfile = await prisma.user.update({
      data: { profile_picture: filename },
      where: { id: Number(id) },
    });
    return response
      .json({
        status: true,
        data: updateProfile,
        message: `picture has change`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

export const deleteUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const findUser = await prisma.user.findFirst({ where: { id: Number(id) } });
    if (!findUser)
      return response
        .status(200)
        .json({ status: false, message: `User with id ${id} not found` });

    /**check the old picture in the folder */
    let path = `${BASE_URL}/../public/profil_picture/${findUser.profile_picture}`;
    let exist = fs.existsSync(path);
    /**delete the old exist picture if reupload new file  */
    if (exist && findUser.profile_picture !== ``) fs.unlinkSync(path);

    /**process to delet User's data */
    const result = await prisma.user.delete({
      where: { id: Number(request.params.id) },
    });
    return response
      .json({
        status: true,
        data: result,
        message: `User with id ${id} has been Deleted`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

//AUTHENTIFICATION USER
export const authentification = async (
  request: Request,
  response: Response
) => {
  try {
    const { email, password } = request.body;

    const findUser = await prisma.user.findFirst({
      where: { email, password: md5(password) },
    });

    if (!findUser)
      return response.status(200).json({
        status: false,
        logged: false,
        message: `Email or password is invalid`,
      });

    let data = {
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
      role: findUser.role,
    };

    let payload = JSON.stringify(data);

    let token = sign(payload, SECRET || "token");

    return response
      .json({
        status: true,
        logged: true,
        message: `Login Success`,
        data: data,
        token,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: false,
        message: `There is an error. ${error}`,
      })
      .status(400);
  }
};

export const getProfile = async (request: Request, response: Response) => {
  try {
    const userBody = request.body.user;
    const getProfile = await prisma.user.findFirst({
      where: {
        id: userBody.id,
      },
    });

    return response
      .json({
        status: true,
        data: getProfile,
        message: `User berhasil ditampilkan`,
      })
      .status(200);
  } catch (error) {
    return response
      .json({
        status: true,
        message: `Terjadi sebuah kesalahan ${error}`,
      })
      .status(400);
  }
};
