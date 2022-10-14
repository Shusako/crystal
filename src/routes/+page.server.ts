//export const prerender = true;

import { error, type RequestEvent } from "@sveltejs/kit";
import * as fs from 'fs';

export async function load({ params }: RequestEvent) {
    const path = process.env.CRYSTAL_DATA_PATH;
    if(path === undefined) {
        throw error(500, "Datapath not set");
    }

    const list: string[] = [];

    fs.readdirSync(path).forEach((path) => {
        list.push(path.replace(".md", ""));
    });

    return {list};
}