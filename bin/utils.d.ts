export declare function setProjectName(dir?: string): Promise<any>;
/**
 * node version need > 8
 * @param version
 */
export declare function compareVersion(version: string): boolean;
/**
 * select mode
 */
export declare function mode(): Promise<any>;
/**
 * file directory
 * @param mode
 */
export declare function type(mode: string): any;
export declare function setFileName(dir?: string): Promise<any>;
/**
 * render view
 * @param filename
 * @param viewsPath
 */
export declare function renderView(filename: string, viewsPath: string): void;
