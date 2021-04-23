# content-replace-loader
## webpack loader: Replace content during compilation

### Demo
```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: [
        {
          loader: 'content-replace-loader',
          options: {
            search: /abc/gi,
            replace: 'def',
          },
        },
      ],
    },
  ],
},
```

#### if you use typescript:
```js
module: {
  rules: [
    {
      test: /\.ts$/,
      use: [
        'ts-loader',
        {
          loader: 'content-replace-loader',
          options: {
            search: /abc/gi,
            replace: 'def',
          },
        },
      ],
    },
  ],
},
```