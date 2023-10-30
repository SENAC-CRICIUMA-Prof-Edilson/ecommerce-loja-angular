import { LocalStorageService } from "src/app/miles/ecommerce/service/local-storage.service";

export const environment = {
  production: true
};

export const miles = {
  api:'',
  token:'',
  package:'ecommerce'
}

// Armazenamento local
export const ls = new LocalStorageService();