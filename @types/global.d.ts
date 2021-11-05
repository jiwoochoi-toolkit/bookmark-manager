export interface BookmarkTreeNode {
    dataAdded?: number;
    dateGroupModified?: number;
    id : string;
    index? : number;
    parentId? : string;
    title : string;
    unmodefied?: 'managed'
    url : string;
}

export interface CreateDetails {
    index? : number
    parentId? : string
    title? : string
    url?: string
}

declare global {
    var chrome: {
        bookmarks : {
            create: (bookamrk : CreateDetails) => Promise<BookmarkTreeNode>,
        }   
    }
}
