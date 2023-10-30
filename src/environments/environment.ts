// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { LocalStorageService } from "src/app/miles/ecommerce/service/local-storage.service";

export const environment = {
  production: false
};

const URL_API = 'http://ws.teia.tec.br/senac/ecommerce-loja/miles/';
export var miles:any = {
  url:URL_API,
  api:URL_API + 'webservice/index.php',
  library: URL_API + 'vendor/theusdido/miles-library/',
  token:'9c372ce9eeaa680bc3c6a0252c711643asdas',
  package:'ecommerce'
}

// Prouto sem foto
export const noImage = 'images/picture/sem-imagem.jpg'

// Armazenamento local
export const ls = new LocalStorageService();

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
