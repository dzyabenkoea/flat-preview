export interface Flat {
    "id": number,
    "floor": number,
    "pos_on_floor": number,
    "price": number,
    "rooms": number,
    "area_total": string,
    "area_kitchen": string,
    "area_live": string,
    "layout_image": string
}

export interface FlatFilter {
    floor: number,
    price: {from:number, to:number},
    liveArea: {from:number, to:number},
    kitchenArea: {from:number, to:number},
    totalArea: {from:number, to:number},
    rooms: number[]
}
