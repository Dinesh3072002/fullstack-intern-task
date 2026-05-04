const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  template_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true }
}, { timestamps: true });

FavoriteSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
