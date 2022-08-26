# Wörterpass v0.1.0

## About this software
This is a web app designed for pracicing german ortography, based on an educational concept named "Wörterpass".
This app is based on svelte kit and scss.


## Requirements

`node`/`npm` need to be running.

## Development

```bash
# install dependencies
> npm install

# start svelte dev, including filewatcher
> npm run dev

# start sass compiler, including filewatcher for `.sass` files
> cd src/sass/
> grunt
```

## Deployment

```bash
# configured to be build as a node app
# will be build into /build
> npx svelte-kit build 
```

- Server needs to run node and npm
- Files needed:
  - `package.json`
  - `/build`

```bash
# install
> npm install

# run app
> node /build
```

## Contributors

[Nikolaus Höfer](https://nikolaushoefer.de)

## License and copyright

Woerterpass - Lernsoftware
Copyright (C) 2022  Nikolaus Höfer

This Software is licensed under the [GNU AGPLv3 license](./LICENSE)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.