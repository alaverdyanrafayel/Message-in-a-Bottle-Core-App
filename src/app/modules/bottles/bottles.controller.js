import { SUCCESS_CODE } from '../../configs/status-codes';
import { BottleService } from '../../services';
import { BadRequest, Conflict } from '../../errors';
import Utils from '../../helpers/utils';
import { BOTTLE_UPLOADED,UNCOMPLETED_BOTTLE_DATA, LONG_MESSAGE } from '../../configs/constants';

export class BottleController {

    /**
     * bottle with description upload
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */

    static async addBottle(req, res, next) {
        const { firstName, lastName, message, city, state, title, country, age } = req.body;
        const { filename } = req.file;
        const { _id } = req.user;
        let bottle;

        try {
            // Insert Bottle details.
            bottle = await BottleService.insertAndFetchUser({
                file: filename,
                first_name: firstName,
                last_name: lastName,
                message,
                city,
                state,
                title,
                country,
                age,
                user: _id
            });

            return res.status(SUCCESS_CODE).json({
                message: BOTTLE_UPLOADED,
                data: bottle,
                errors: null
            });
        }
        catch (err) {
            next(err);
        }
    }
 }
