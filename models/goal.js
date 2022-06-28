const mongoose = require('mongoose')
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const goalSchema = new Schema({
    goalName: String,
    accomplished: {
        type: Boolean,
        default: false
    },
    stillImproving: {
        type: Boolean,
        default: false
    },
    beginDate:   {
        type: Date,
        default: function() {
        let tday = new Date();
        let year = tday.getFullYear();
        var month = tday.getMonth();
        var day = tday.getDate();
        var cday = new Date(year, month, day);
        return cday
      }
        },
    endDate:   {
        type: Date,
        default: function() {
        let tday1 = new Date();
        let year1 = tday1.getFullYear();
        var month1 = tday1.getMonth();
        var day1 = tday1.getDate();
        var cday1 = new Date(year1, month1, day1 + 7);
        return cday1
      }
        }
    })

    module.exports = mongoose.model('Goal', goalSchema);