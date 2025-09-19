module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' }, bugfixes: true }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [], // Remove the plugin, let preset-env handle it
};