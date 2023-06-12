const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
    liner: {type: String, required: false},
    mode: {type: String, required: false},
    pol: {type: String, required: false},
    pod: {type: String, required: false },
    loading: {type: String, required: false},
    discharge: {type: String, required: false},
    country: {type: String, required: false},
    dep: {type: String, required: false},
    unit: {type: String, required: false},
    oft: {type: Number, required: false},
    lss: {type: Number},
    d_port: {type: Number},
    rail: {type: Number, required: false},
    convoy: {type: Number},
    d_thc: {type: Number},
    dpb: {type: Number},
    dps: {type: Number},
    ttl: {type: Number, required: false},
    valid: {type: String},
    remark: {type: String}
});


const Rate = mongoose.model('Rates', rateSchema);
module.exports = Rate;