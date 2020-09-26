import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        path: 'root',
        screens: {
          Auth: 'auth',
          VKAuth: 'AuthVK',
        },
      },
    }
  },
};
