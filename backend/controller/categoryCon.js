const Category = require("../model/category-model");

exports.addCategory = async (req, res) => {
  try {
    const jsondata = JSON.parse(req.body.categorydata);
    const myCategory = new Category(jsondata);
    myCategory.image = req.file ? req.file.filename : null;
    await myCategory.save();
    res.json({ message: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const jsondata = JSON.parse(req.body.categorydata);
    if (req.file) {
      jsondata.image = req.file ? req.file.filename : null;
      const categoryData = await Category.find({ _id: req.body._id });
      if (categoryData.image) {
        const filepath = "./upload/categoryimage/" + categoryData.image;
        fs.access(filepath, fs.constants.F_OK, (err) => {
          if (err) {
            console.error("Image does not exist");
          } else {
            fs.unlinkSync(filepath);
          }
        });
      }
    }
    const myCategory = await Category.findOneAndUpdate(
      { _id: req.body._id },
      { $set: jsondata }
    );
    res.json({ message: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const categoryData = await Category.find({});
    res.json({ message: "ok", data: categoryData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const _id = req.body._id;
    const categorydata = await Category.findOne({
      _id: _id,
    });
    if (categorydata.image) {
      const filepath = "./upload/categoryimage/" + categorydata.image;
      fs.access(filepath, fs.constants.F_OK, (err) => {
        if (err) {
          console.error("Image does not exist");
        } else {
          fs.unlinkSync(filepath);
        }
      });
    }

    const rmdata = await Category.findOneAndDelete({ _id: _id });
    if (rmdata) {
      res.json({ message: "ok" });
    } else {
      res.status(400).json({ message: "please try again" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};


