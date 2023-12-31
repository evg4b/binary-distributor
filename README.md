<p align="center">
  <a href="https://www.npmjs.com/package/binary-distributor" title="binary-distributor">
    <img alt="binary-distributor" width="80%" src="https://raw.githubusercontent.com/evg4b/binary-distributor/main/.github/logo.svg">
  </a>
</p>

**binary-distributor** is an npm package that simplifies the distribution of platform-specific binary applications via npm.
It allows you to include and install pre-built binaries based on the user's system and architecture along with your
JavaScript module.

## Usage

Initialize minimal npm package:
```bash 
npm init -y
```

Pay attentions fields `name` and `version` should be defined and same as in your binary package.

Install **binary-distributor**:
```bash
npm install binary-distributor --save-dev
```

Add `postinstall` and `preuninstall` scripts to your `package.json`:
```json
{
  "scripts": {
    "postinstall": "binary-distributor install",
    "preuninstall": "binary-distributor uninstall"
  }
}
```

Add `binary-distributor` section to your `package.json`:
```json
{
  "binary-distributor": {
    "url-template": "url/to/your/binary.tar.gz"
  }
}
```

Following variables are available to customize the URL template:
- `{name}` - Name of the package read from package.json file.
- `{version}` - Version number read from package.json file.
- `{platform}` - Name of the operating system ([Read more](https://nodejs.org/api/process.html#processplatform)).
- `{arch}` - The operating system CPU architecture ([Read more](https://nodejs.org/api/process.html#processarch)).

Create launch script `launch.js` with following content:
```js
#!/usr/bin/env node
require('binary-distributor')
  .launch(__dirname);
```

Add `bin` section to your `package.json`:
```json
{
  "bin": "./launch.js"
}
```

Then you can publish your package to npm registry:
```bash
npm publish
```

## Support project

<p align="center" dir="auto">
<br>
<a target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/evg4b">
    <img src="https://github.com/appcraftstudio/buymeacoffee/raw/master/Images/snapshot-bmc-button.png" width="200" style="max-width: 100%;">
</a>
</p>
