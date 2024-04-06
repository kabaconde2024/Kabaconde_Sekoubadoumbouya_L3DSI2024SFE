const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: Number, required: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ['user'] },
    formations: { type: [Schema.Types.ObjectId], ref: 'Formation', default: [] },
    sessionformateur: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
});


module.exports = mongoose.model('User', userSchema);

