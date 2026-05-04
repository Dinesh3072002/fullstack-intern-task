const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  thumbnail_url: { type: String },
  category: { type: String }
}, { timestamps: true });

TemplateSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Template', TemplateSchema);
