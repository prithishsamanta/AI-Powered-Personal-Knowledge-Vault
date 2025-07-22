const mongoose = require('mongoose');

const vaultSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String, 
        default: "",
        trim: true
    },
    notes: {
        type: String,
        default: ""
    },
    summary: {
        type: String,
        default: ""
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
}, { 
    timestamps: true 
});

// Update the updatedAt field before saving
vaultSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Vault = mongoose.model('Vault', vaultSchema);

module.exports = Vault; 