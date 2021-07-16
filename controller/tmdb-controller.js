const fetch = require("node-fetch");

module.exports.getAll = (req, res) => {
  fetch(
    "https://api.themoviedb.org/3/list/1?api_key=20afb9fc5a164644664818290a6c017e"
  )
    .then((result) => result.json())
    .then((data) => res.json(data));
};

module.exports.getOne = (req, res) => {
  const { movieId } = req.params;
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=20afb9fc5a164644664818290a6c017e`
  )
    .then((result) => result.json())
    .then((data) => res.json(data));
};
