const whitelist = ["http://localhost:3000", "https://impactnigeria.org/"];

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
