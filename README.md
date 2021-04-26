# any-content-replace-loader
## webpack loader: Replace content during compilation

### example
#### replace abc with def by this loader

##### before:
```js
 // a.ts
 console.log('a.ts: abc');
 // b.ts
 console.log('b.ts: abc');
```
##### after:
```js
 // a.ts
 console.log('a.ts: def');
 // b.ts
 console.log('b.ts: def');
```


### Demo
```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: [
        {
          loader: 'any-content-replace-loader',
          options: {
            search: /abc/gi,
            replace: 'def',
          },
        },
      ],
      exclude: /node_modules/,
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
          loader: 'any-content-replace-loader',
          options: {
            search: /abc/gi,
            replace: 'def',
          },
        },
      ],
      exclude: /node_modules/,
    },
  ],
},
```