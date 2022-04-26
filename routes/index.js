import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Router } from 'express';

export default {
    loadRoutes: (app) => {
        const prefix = '/api/v1/fiman/';

        app.get('/', (req, res) => res.send('TEST BLANK PAGE'));

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        fs.readdirSync(__dirname).forEach((file) => {
            if (file === 'index.js') return;

            let pathName = file.replace('.js', '').split('.')[0];
            pathName = pathName[pathName.length - 1] === 'y' ?
                pathName.slice(0, pathName.length - 1) + 'ies' : pathName + 's';

            const routePath = 'file:///' + path.resolve(__dirname, file);

            import(routePath).then((module) => {
                const route = module.default.loadRouter(Router());
                app.use(prefix + pathName, route);

                
                console.info('Loaded route ' + pathName);
            }).catch(err => console.error(err));
        });
    }
}