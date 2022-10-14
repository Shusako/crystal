import { error, type RequestEvent } from "@sveltejs/kit";
import * as fs from 'fs';

export async function load({ params }: RequestEvent) {
    const bodyBuilder = fs.readdirSync(".").reduce((prev, cur) => { return prev + ", " + cur});

    const slug = params.slug;

    let path = process.env.CRYSTAL_DATA_PATH;
    if(path === undefined) {
        throw error(500, "Datapath not set");
    }
    path += slug + ".md";

    const title = slug?.toUpperCase();
    let body = ""; 

    if(fs.existsSync(path))
    {
        body = fs.readFileSync(path, {encoding:'utf8', flag:'r'});
    } else {
        // TODO: do you want to create it?
        throw error(404, 'Not found');
    }

    return {title, body};

    throw error(404, 'Not found');
}