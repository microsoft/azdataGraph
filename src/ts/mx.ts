import factory, { mxGraphExportObject } from 'mxgraph';

declare global {
  interface Window {
    mxBasePath: string;
    mxLoadResources: boolean;
    mxForceIncludes: boolean;
    mxLoadStylesheets: boolean;
    mxResourceExtension: string;
  }
}

//window.mxBasePath = '../node_modules/mxgraph/javascript/src';
window.mxLoadResources = false;
window.mxForceIncludes = false;
window.mxLoadStylesheets = false;
window.mxResourceExtension = '.txt';

export const mxGraphFactory: mxGraphExportObject = factory({
})