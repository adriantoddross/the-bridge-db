const whitelist = [
  "http://localhost:3000",
  "https://the-bridge-db.herokuapp.com/",
];

module.exports = {
  corsOptions: {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  },
};
