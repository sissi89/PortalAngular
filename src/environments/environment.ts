// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //http://localhost:4000/sinistri/dettagliosinistro/0001/1
  api2:'http://localhost:4000/sinistri/dettagliosinistro',
  api:'http://localhost:4000/sinistri',
 //api2:'http://localhost:4000/users/sinistro',
  // auth: 'http://localhost:3000/auth',
  auth:'http://localhost:4000',
 // auth:'    http://10.0.100.6:3000/auth',
  uplaodFile:'https://res.cloudinary.com/demo/image/upload/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
