import { Request } from "express";
import multer from "multer";
import { BASE_URL } from "../global"

/**define storage configuration of product picture */
const storage = multer.diskStorage({
    destination: (request:Request, file: Express.Multer.File, cb:(error: Error | null, destination: string)=> void) => {
        /**define location of uploaded picture, make sure that you have create a "public" folder in root folder.
         *  then create folder "product-picture inside of  "public folder"
         */
        cb(null, `${BASE_URL}/public/product_picture`)
},
filename: (request: Request, file: Express.Multer.File, cb:(error: Error | null, destination: string )=> void) => {
    /**define file name of uploaded file */
    cb(null, `${new Date().getTime().toString()}-${file.originalname}`)
    }
})

const uploadFileProduct= multer({
    storage,
    limits:{fileSize: 2 * 1024 * 1024} /**define max size of uploaded file, in this case max size is 2 MB */
})

export default uploadFileProduct