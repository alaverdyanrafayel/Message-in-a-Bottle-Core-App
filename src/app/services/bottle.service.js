import mongoose from 'mongoose';
const Bottle = mongoose.model('Bottle');

export class BottleService {
    
    constructor () {}

    static async insertAndFetchUser(data) {
        return Bottle.create(data);
    }
 }
 