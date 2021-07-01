const CategoriesModel = require("../../Models/Categories");
const slugify = require("slugify");

const CreateCategory = (req, res) => {
  const name = req.body.name;
  const parentId = req.body.parentId;
  let CatObj;

  if (name) {
    CatObj = { name, slug: slugify(name), parentId };
  }
  if (parentId) {
    CatObj = { ...CatObj, parentId };
  }

  const newCat = new CategoriesModel(CatObj);

  newCat.save((err, success) => {
    if (err) {
      res.status(400).json({ Message: "Something went happened " });
    }
    if (success) {
      res.status(201).json({ Message: "New category inserted" });
    }
  });
};

module.exports = {
  CreateCategory,
};
