import { hashSync, genSaltSync, compareSync } from 'bcryptjs';

export default (mongoose) => {
    let UserSchema = mongoose.Schema({
        email: { type: String, index: true },
        password: { type: String },
        first_name: { type: String, index: true },
        last_name: { type: String, index: true },
        profile_picture: { type: String },
        accountId: { type: String },
        instagram_access_token: { type: String },
        facebook_access_token: { type: String },
        education: { type: Array },
        location: { type: String },
        username: { type: String },
        // bottles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bottle' }],
        loc: {
            type: [Number],
            index: '2d'
        }
    });

    UserSchema.pre('save', function (next) {
        if (this.password)
            this.password = hashSync(this.password, genSaltSync(8));

        next();
    });

    UserSchema.methods = {
        validatePassword: function userCheckPassword(pw) {
            return compareSync(pw, this.password);
        }
    };

    return mongoose.model('User', UserSchema);
};

