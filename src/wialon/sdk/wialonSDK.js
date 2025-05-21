import { loadLibraries } from '../config/libraries.wialon.js';
import { all_avl } from '../config/spec.wialon.js';

class WialonSDK {
    constructor() {
        this.token = null;
        this.session = null;
    }

    async init(token) {
        return new Promise((resolve, reject) => {
            if (!window.wialon) {
                reject("SDK de Wialon no está cargado");
                return;
            }

            this.token = token;
            wialon.core.Session.getInstance().initSession("https://hst-api.wialon.com");

            wialon.core.Session.getInstance().loginToken(this.token, "", (code) => {
                if (code) {
                    reject(`Error al iniciar sesión: ${wialon.core.Errors.getErrorText(code)}`);
                } else {
                    this.session = wialon.core.Session.getInstance();
                    loadLibraries( this.session )
                    this.session.updateDataFlags(all_avl, () => resolve(this.session)
                    );
                }
            });
        });
    }
}

export default new WialonSDK();
