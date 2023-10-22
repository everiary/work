module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue() {
        return 102;
      },
      propList: ["*"],
    },
  },
};
