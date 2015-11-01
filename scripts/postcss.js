import postcss from 'postcss';
import imports from 'postcss-import';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import minimist from 'minimist';
import {createReadStream, createWriteStream} from 'fs';
import map from 'map-stream';
import path from 'path';

const argv = minimist(process.argv.slice(2));
const entry = path.join(process.cwd(), argv.e);
const output = path.join(process.cwd(), argv.o);
const processor = postcss([autoprefixer, imports, cssnano]);

createReadStream(entry)
	.pipe(map((data, cb) => {
		processor.process(data)
			.then(result => cb(null, result.css), cb);
	}))
	.pipe(createWriteStream(output));
