export default (mongoose) => {
    let BottleSchema = mongoose.Schema({
        file: {type: String},
        first_name: {type: String},
        last_name: {type: String},
        city: {type: String},
        country: {type: String},
        state: {type: String},
        title: {type: String},
        message: {type: String},
        age: {type: Number},
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    });

    return mongoose.model('Bottle', BottleSchema);
};
