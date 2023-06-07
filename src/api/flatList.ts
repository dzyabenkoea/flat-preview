import {Flat} from "../types";

export function getFlatList():Promise<Flat[]>{
    return fetch('http://vpn-ne.ftp.sh:3000/flat-list')
        .then(response => response.json())
}