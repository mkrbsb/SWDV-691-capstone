const Restaurant = require("../model/restaurants-model");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.getAll = async (req, res) => {
  const { city } = req.query.city;
  const arr = ["one", "two", "three", "four"];
  const results = await Promise.all(
    arr.map(async (num, idx) => {
      const res = await fetch(
        `https://api.yelp.com/v3/businesses/search?location=" + "${city}" + "&price=${
          idx + 1
        }&limit=50`,
        {
          mode: "no-cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.API_KEY,
          },
          credentials: "same-origin",
        }
      );
      const data = await res.json();
      return { [num]: data };
    })
  );
  res.json(results);
};

module.exports.LandingPage = async (req, res) => {
  const { city } = req.params;
  console.log(city);
  const result = await fetch(
    `https://api.yelp.com/v3/businesses/search?location="+"${city}"&limit=50`,
    {
      mode: "no-cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.API_KEY,
      },
      credentials: "same-origin",
    }
  );
  const data = await result.json();
  res.json(data);
};

module.exports.getOne = (req, res) => {
  // const id  = req.params.id
  // Restaurant.find({id}, async (err,restaurant) =>{
  //     if(restaurant){
  //         res.json(restaurant)
  //     }
  //     const newRestaurant = new Restaurant({
  //         id,
  //         data: req.body.data
  //     })
  //     newRestaurant.save().then(err => res.json({err:{message:[err]}}))""
  // })
};

module.exports.dislike = async (req, res) => {
  const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
  const userId = decoded.user;
  const id = req.body.id;
  const likes = [];
  const dislikes = [];
  const restaurant = await Restaurant.findById({ _id: id }).catch((err) =>
    console.log(err)
  );
  if (restaurant) {
    if (
      restaurant.dislikes.filter(
        (dislike) => dislike.user.toString() === userId
      ).length > 0
    ) {
      if (
        restaurant.likes.filter((like) => like.user.toString() === userId)
          .length > 0
      ) {
        const index = restaurant.likes.findIndex(
          (like) => like.user.toString() === userId
        );
        restaurant.likes.splice(index, 1);
        await restaurant.save();
        Restaurant.find({}, (err, data) => {
          if (err) {
            return;
          }

          data.forEach((obj) => {
            obj.likes.forEach((like) => {
              if (like.user.toString() === userId) {
                likes.push({ [obj._id]: like.user });
              }
            });
          });
          data.forEach((obj) => {
            obj.dislikes.forEach((dislike) => {
              if (dislike.user.toString() === userId) {
                dislikes.push({ [obj._id]: dislike.user });
              }
            });
          });
          res.json({ likes, dislikes });
        });
      }
      const index = restaurant.dislikes.findIndex(
        (dislike) => dislike.user.toString() === userId
      );
      restaurant.dislikes.splice(index, 1);
      await restaurant.save();
      Restaurant.find({}, (err, data) => {
        if (err) {
          return;
        }

        data.forEach((obj) => {
          obj.likes.forEach((like) => {
            if (like.user.toString() === userId) {
              likes.push({ [obj._id]: like.user });
            }
          });
        });
        data.forEach((obj) => {
          obj.dislikes.forEach((dislike) => {
            if (dislike.user.toString() === userId) {
              dislikes.push({ [obj._id]: dislike.user });
            }
          });
        });
        res.json({ likes, dislikes });
      });
    } else {
      restaurant.dislikes.unshift({ user: userId });
      await restaurant.save();
      Restaurant.find({}, (err, data) => {
        if (err) {
          return;
        }

        data.forEach((obj) => {
          obj.likes.forEach((like) => {
            if (like.user.toString() === userId) {
              likes.push({ [obj._id]: like.user });
            }
          });
        });
        data.forEach((obj) => {
          obj.dislikes.forEach((dislike) => {
            if (dislike.user.toString() === userId) {
              dislikes.push({ [obj._id]: dislike.user });
            }
          });
        });
        res.json({ likes, dislikes });
      });
    }
  } else {
    const newRestaurant = new Restaurant({
      _id: req.body.id,
      data: req.body,
      likes: [{ user: userId }],
    });
    const data = await newRestaurant
      .save()
      .catch((error) => res.json({ err: { message: error } }));
    Restaurant.find({}, (err, data) => {
      if (err) {
        return;
      }

      data.forEach((obj) => {
        obj.likes.forEach((like) => {
          if (like.user.toString() === userId) {
            likes.push({ [obj._id]: like.user });
          }
        });
      });
      data.forEach((obj) => {
        obj.dislikes.forEach((dislike) => {
          if (dislike.user.toString() === userId) {
            dislikes.push({ [obj._id]: dislike.user });
          }
        });
      });
      res.json({ likes, dislikes });
    });
  }
};

module.exports.like = async (req, res) => {
  const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);
  const userId = decoded.user;
  const id = req.body.id;
  const likes = [];
  const dislikes = [];
  const restaurant = await Restaurant.findById({ _id: id }).catch((err) =>
    console.log(err)
  );
  if (restaurant) {
    if (
      restaurant.likes.filter((like) => like.user.toString() === userId)
        .length > 0
    ) {
      if (
        restaurant.dislikes.filter(
          (dislike) => dislike.user.toString() === userId
        ).length > 0
      ) {
        const index = restaurant.dislikes.findIndex(
          (dislike) => dislike.user.toString() === userId
        );
        restaurant.dislikes.splice(index, 1);
        await restaurant.save();
        Restaurant.find({}, (err, data) => {
          if (err) {
            return;
          }

          data.forEach((obj) => {
            obj.likes.forEach((like) => {
              if (like.user.toString() === userId) {
                likes.push({ [obj._id]: like.user });
              }
            });
          });
          data.forEach((obj) => {
            obj.dislikes.forEach((dislike) => {
              if (dislike.user.toString() === userId) {
                dislikes.push({ [obj._id]: dislike.user });
              }
            });
          });
          res.json({ likes, dislikes });
        });
      }
      const index = restaurant.likes.findIndex(
        (like) => like.user.toString() === userId
      );
      restaurant.likes.splice(index, 1);
      await restaurant.save();
      Restaurant.find({}, (err, data) => {
        if (err) {
          return;
        }

        data.forEach((obj) => {
          obj.likes.forEach((like) => {
            if (like.user.toString() === userId) {
              likes.push({ [obj._id]: like.user });
            }
          });
        });
        data.forEach((obj) => {
          obj.dislikes.forEach((dislike) => {
            if (dislike.user.toString() === userId) {
              dislikes.push({ [obj._id]: dislike.user });
            }
          });
        });
        res.json({ likes, dislikes });
      });
    } else {
      restaurant.likes.unshift({ user: userId });
      await restaurant.save();
      Restaurant.find({}, (err, data) => {
        if (err) {
          return;
        }

        data.forEach((obj) => {
          obj.likes.forEach((like) => {
            if (like.user.toString() === userId) {
              likes.push({ [obj._id]: like.user });
            }
          });
        });
        data.forEach((obj) => {
          obj.dislikes.forEach((dislike) => {
            if (dislike.user.toString() === userId) {
              dislikes.push({ [obj._id]: dislike.user });
            }
          });
        });
        res.json({ likes, dislikes });
      });
    }
  } else {
    const newRestaurant = new Restaurant({
      _id: req.body.id,
      data: req.body.data,
      likes: [{ user: userId }],
    });
    const data = await newRestaurant
      .save()
      .catch((error) => res.json({ err: { message: error } }));
    Restaurant.find({}, (err, data) => {
      if (err) {
        return;
      }

      data.forEach((obj) => {
        obj.likes.forEach((like) => {
          if (like.user.toString() === userId) {
            likes.push({ [obj._id]: like.user });
          }
        });
      });
      data.forEach((obj) => {
        obj.dislikes.forEach((dislike) => {
          if (dislike.user.toString() === userId) {
            dislikes.push({ [obj._id]: dislike.user });
          }
        });
      });
      res.json({ likes, dislikes });
    });
  }
};

module.exports.deleteOne = async (req, res) => {
  const id = req.params.restaurantId;
  console.log(id);
};
