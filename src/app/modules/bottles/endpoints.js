import { BottleController } from './bottles.controller';
import middlewares from '../../middlewares';
import schemas from './schemas';
import multer from 'multer';
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './client/public/uploads');
    },

    filename: (req, file, callback) => {
        const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);

        callback(null, filename);
    }
});

const upload = multer({ storage } );

export default (router) => {

    router.post('/', [upload.single('file'), ...middlewares(schemas, 'addBottle')], BottleController.addBottle);

};
