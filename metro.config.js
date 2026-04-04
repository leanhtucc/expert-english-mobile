const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const { withNativeWind } = require('nativewind/metro');
const config = getSentryExpoConfig(__dirname);

// Allow .mjs modules used by some dependencies.
if (!config.resolver.sourceExts.includes('mjs')) {
  config.resolver.sourceExts.push('mjs');
}

module.exports = withNativeWind(config, { input: './global.css' });
