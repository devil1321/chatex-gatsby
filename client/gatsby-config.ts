import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `chatex`,
    siteUrl: `https://www.yourdomain.tld`,
    author:`Dominik Stepien`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-sass",  "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  },
  {
    resolve: `gatsby-plugin-react-redux`,
    options: {
      // [required] - path to your createStore module
      pathToCreateStoreModule: './src/controller/store',
      // [optional] - options passed to `serialize-javascript`
      // info: https://github.com/yahoo/serialize-javascript#options
      // will be merged with these defaults:
      serialize: {
        space: 0,
        // if `isJSON` is set to `false`, `eval` is used to deserialize redux state,
        // otherwise `JSON.parse` is used
        isJSON: true,
        unsafe: false,
        ignoreFunction: true,
      },
      // [optional] - if true will clean up after itself on the client, default:
      cleanupOnClient: true,
      // [optional] - name of key on `window` where serialized state will be stored, default:
      windowKey: '__PRELOADED_STATE__',
    }
  }]
};

export default config;
