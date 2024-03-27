export interface PhotoI {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export type CollectionT = { [key: number]: PhotoI[] }
