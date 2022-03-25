export interface Place {
    id: string;
    displayname: string;
    loctype: string;
    cid: number;
    rid: number;
    ctid: number;
    lat: number;
    lng: number;
    cc: string;
    country: string;
    rc: string;
    cityname: string;
    timezone: string;
    utc: string;
    airportname: string | null;
    ap: string;
    apicode: string;

    citynameshort: string | null;
    cityonly: string;
    destination_images: {
        image_jpeg: string;
        image_webp: string;
    };
    displayType: {
        type: string;
        displayName: string;
    };
    entityKey: string;
    guidebook_count: number | null;
    indexId: string;
    kayakId: string;
    kayakType: string;
    locationname: string;
    name: string;
    objectID: string;
    placeID: string;
    ptid: string;
    region: string;
    searchFormPrimary: string;
    searchFormSecondary: string;
    secondary: string;
    shortdisplayname: string;
    smartyDisplay: string;
}
