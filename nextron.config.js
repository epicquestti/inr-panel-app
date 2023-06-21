module.exports = {
  packagerConfig: {
    executableName: "panel-inr-setup",
  },
  mainSrcDir: "main",
  rendererSrcDir: "renderer",
  webpack: (config, { dev }) => {
    return config;
  },
};
