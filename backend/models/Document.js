const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: { type: String, required: true },
    category: { type: String, enum: ['Passport', 'Aadhaar', 'Driving License', 'Voter ID', 'Other'], required: true },
    expiryDate: Date,
    fileUrl: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', DocumentSchema);