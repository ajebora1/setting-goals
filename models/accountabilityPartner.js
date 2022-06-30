const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountabilityPartnersSchema = new Schema({
  name: {type: String, required: true, unique: true},
  relationship: String
}, {
  timestamps: true
});

module.exports = mongoose.model('AccountabilityPartner', accountabilityPartnersSchema);