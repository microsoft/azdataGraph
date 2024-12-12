/// <reference path="../index.d.ts" />
import factory from '../dist/build';

declare global {
    interface Window {
        mxBasePath: string;
        mxLoadResources: boolean;
        mxForceIncludes: boolean;
        mxLoadStylesheets: boolean;
        mxResourceExtension: string;
    }
}

window.mxBasePath = 'assets/mxgraph';
window.mxLoadResources = true;
window.mxForceIncludes = false;
window.mxLoadStylesheets = true;
window.mxResourceExtension = '.txt';

const mx = factory();


