const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required:true
    },
    price: {
      type: Number,
      required: true,
    },
    quantity:{
      type:Number,
      required:true,
    },
    description: {
      required: true,
      type: String,
      trim: true,
    },
    slug: {
      required: true,
      type: String,
    },
    offer: {
      type: Number,
    },
    photo: [
      {
        img: {
          type: String,
        },
      },
    ],
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, //like foreign key in relational
        review: {
          type: String,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required:true
    },
  },
  { timestamps: true }
);
const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = { ProductModel };
