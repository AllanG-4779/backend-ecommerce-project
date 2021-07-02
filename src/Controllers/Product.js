const slugify = require("slugify");
const { ProductModel } = require("../Models/Product");

const multer = require("multer");
const shortid = require("shortid");
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(path.dirname(__dirname), "product_imgs")),
  filename: (req, file, cb) => {
    cb(null, `${shortid.generate()}-${file.originalname}`);
  },
});
//filter the required images only
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("The file you uploaded is not supported"), false);
    req.error = "That file isn't supported";
  }
};

const uploads = multer({ storage, fileFilter }).array("product_img");
const addProduct = (req, res) => {


  //   Check if there are one or more files in the request
  uploads(req, res, (err) => {
      const { name, category, price, quantity, description } = req.body;
    if (err) {
      res
        .status(403)
        .json({ Message: "Only png, jpeg or jpg files are allowed" });
    } else {
      let myProd_images;
      if (req.files.length > 0) {
        myProd_images = req.files.map((file) => {
          return { img: file.filename };
        });
      }
      console.log(typeof name)
      const product = {
        name,
        category,
        price,
        quantity,
        description,
        slug: slugify(name),
        photo: myProd_images,
        createdBy: req.user._id,
      };

      const prodModel = new ProductModel(product);
      prodModel.save((err, succ) => {
        if (err) {
          res.status(401).json({ Message: err });
        }
        if (succ) {
          res.status(201).json({ Message: "Product added successfully" });
        }
      });
    }
  });
};
module.exports = addProduct;
