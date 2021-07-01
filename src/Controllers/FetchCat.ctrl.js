const CategoriesModel = require("../Models/Categories");
//this is a recursive function that call the categories and subcategories in the database
//The categories has a relationship of parent and child into various levels
const form_List_category = (categories, parentId = null) => {
  const catergoryList = [];
  let catergory;
  if (parentId == null) {
    catergory = categories.filter(
      (rootNode) => rootNode.parentId ==undefined
    );
  } else {
    catergory = categories.filter((rootNode) => rootNode.parentId == parentId);
  }
  for (let items of catergory) {
    catergoryList.push({
      _id: items._id,
      name: items.name,
      slug: items.slug,
      
      children: form_List_category(categories,items._id),
    });
  }
  return catergoryList;
};

const fetchCategories = (req, res) => {
  CategoriesModel.find({}, (err, result) => {
    if (err) res.status(400).json({ Message: "Something went wrong" });
    if (result) {
      const categoryList = form_List_category(result);
      res.status(200).json({ categoryList });
    }
  });
};
module.exports = {
  fetchCategories,
};
