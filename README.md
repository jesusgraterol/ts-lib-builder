# TypeScript Library Builder

The `ts-lib-builder` package is designed to simplify the build process for your TypeScript libraries and APIs. It combines the essential steps of compilation and minification into a single, efficient workflow.

## Getting Started

Install the package:
```bash
npm i -D ts-lib-builder
```

Include it in your `build` script:
```json
{
  ...
  "scripts": {
    "build": "ts-lib-builder --tsconfig=tsconfig.build.json",
    ...
  }
  ...
}

```

Generate an optimized production-grade build:
```bash
npm run build
```




<br/>

## Built With

- TypeScript



<br/>

## License

[MIT](https://choosealicense.com/licenses/mit/)





<br/>

## Acknowledgments

- [Terser](https://github.com/terser/terser)