const Restaurant = require("../model/restaurants-model");
const jwt = require("jsonwebtoken");

module.exports.getAll = async (req, res) => {
  const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
  const userId = decoded.user;
  await Restaurant.find({}, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    // res.json(data);
    const favs = data.filter((rest) => {
      if (rest.likes.some((like) => like.user.toString() === userId)) {
        return true;
      }
    });

    const mappedFav = favs.map((fav) => fav.data);
    res.json(mappedFav);
  });
};
