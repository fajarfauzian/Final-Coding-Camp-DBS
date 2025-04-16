import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../global";
import fs from "fs";

const prisma = new PrismaClient({ errorFormat: "pretty" });

//GET ALL PRODUCT
export const getAllProduct = async (request: Request, response: Response) => {
  try {
    const { search } = request.query;
    const allProduct = await prisma.product.findMany({
      where: { name: { contains: search?.toString() || "" } },
    });
    //Output
    return response
      .json({
        status: true,
        data: allProduct,
        message: `Product has retrived`,
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

//CREATE product
export const createProduct = async (request: Request, response: Response) => {
  try {
    const { name, price, category, description } = request.body;
    if (!name || !price || !category || !description) {
        return response.status(400).json({
          status: false,
          message: "All fields (name, price, category, description) must be filled",
        });
      }

      if (isNaN(price)) {
        return response.status(400).json({
          status: false,
          message: "Price must be a valid number",
        });
      }
  
    const uuid = uuidv4();

    let filename = "";
    if (request.file)
      filename = request.file?.filename; /** get filename of upload file*/

    const newProduct = await prisma.product.create({
      data: {
        uuid,
        name,
        price: Number(price),
        category,
        description,
        picture: filename,
      },
    });
    //Output
    return response
      .json({
        status: true,
        data: newProduct,
        message: `New product has created`,
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

//UPDATE product
export const updateProduct = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name, price, category, description } = request.body;

    const findProduct = await prisma.product.findFirst({ where: { id: Number(id) } });
    if (!findProduct)
      return response
        .status(200)
        .json({ status: false, message: `id: ${id} is not found` });

    /** default value  filename of  saved data*/
    let filename = findProduct.picture;
    if (request.file) {
      /**update filename by new uploaded picture */
      filename = request.file.filename;
      /**check the old picture in the folder */
      let path = `${BASE_URL}/../public/product_picture/${findProduct.picture}`;
      let exist = fs.existsSync(path);
      /**delet the old exist picture if reupload new file  */
      if (exist && findProduct.picture !== ``) fs.unlinkSync(path);
    }

    const updateProduct = await prisma.product.update({
      data: {
        name: name || findProduct.name,
        price: price ? Number(price) : findProduct.price,
        category: category || findProduct.category,
        description: description || findProduct.description,
        picture: filename
      },
      where: { id: Number(id) },
    });
    return response
      .json({
        status: true,
        data: updateProduct,
        message: `Product has been updated`,
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


//DELETE product
export const deleteProduct = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const findProduct = await prisma.product.findFirst({ where: { id: Number(id) } });
    if (!findProduct)
      return response
        .status(200)
        .json({ status: false, message: `Product with id ${id}  not found` });

    /**check the old picture in the folder */
    let path = `${BASE_URL}/../public/product_picture/${findProduct.picture}`;
    let exist = fs.existsSync(path);
    /**delete the old exist picture if reupload new file  */
    if (exist && findProduct.picture !== ``) fs.unlinkSync(path);

    /**process to delet product's data */
    const result = await prisma.product.delete({
      where: { id: Number(request.params.id) },
    });
    return response
      .json({
        status: true,
        data: result,
        message: `Product with id ${id} has been Deleted`,
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
