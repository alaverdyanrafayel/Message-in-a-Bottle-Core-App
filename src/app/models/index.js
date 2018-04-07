import User from './user';
import Bottle from './bottle';

export default function initModels(mongoose) {
    User(mongoose);
    Bottle(mongoose);
};
