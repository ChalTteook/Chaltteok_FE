module.exports = function(api) {
  const isProduction = process.env.NODE_ENV === 'production';
  api.cache(true);
  
  const plugins = [
    [
      "module:react-native-dotenv",
      {
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }
    ]
  ];

  // React Refresh를 development에서만 추가
  if (!isProduction) {
    try {
      plugins.unshift('react-refresh/babel');
    } catch (error) {
      console.log('React Refresh not available, skipping...');
    }
  }
  
  return {
    presets: ['babel-preset-expo'],
    plugins: plugins
  };
};
