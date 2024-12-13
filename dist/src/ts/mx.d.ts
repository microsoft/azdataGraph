import { mxGraphExportObject } from 'mxgraph';
declare global {
    interface Window {
        mxBasePath: string;
        mxLoadResources: boolean;
        mxForceIncludes: boolean;
        mxLoadStylesheets: boolean;
        mxResourceExtension: string;
    }
}
export declare const mxGraphFactory: mxGraphExportObject;
