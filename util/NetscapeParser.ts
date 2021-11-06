/** reference : https://github.com/calibr/node-bookmarks-parser/blob/master/lib/parsers/netscape.js */
//fetch -> update?//how?

interface Parsable {
    canParse(html: string): boolean;
    prase(html: string): Promise<BookmarkTreeNode>;
}

interface BookmarkTreeNode {
    children?: BookmarkTreeNode[],
    dataAdded?: number;
    dateGroupModified?: number;
    id: string;
    index?: number;
    parentId?: number;
    title: string;
    url?: string;
}

interface DataType {
    type: string,
    url: string, title: string,
    add_date: string,
    icon: string,
    last_modified: string,
    ns_root: any,
    __dir_dl: Element,
}
type NullablePartial<
    T,
    NK extends keyof T = { [K in keyof T]: null extends T[K] ? K : never }[keyof T],
    NP = Partial<Pick<T, NK>> & Pick<T, Exclude<keyof T, NK>>
    > = { [K in keyof NP]: NP[K] }


type Nullable<T> = T | null;

export default class NetscapeParser implements Parsable {

    constructor() {

    }

    // private processDir(dir, level) {

    // }


    // private getNodeData(node: Document): Nullable<DataType> {

    //     var data: Nullable<DataType> = {
    //         '__dir_dl': null,
    //         'add_date': null,
    //         'icon': null,
    //         'last_modified': null,
    //         'ns_root': null,
    //         'title': null,
    //         'type': null,
    //         'url': null
    //     }

    //     for (var i = 0; i != node.children.length; i++) {
    //         if (node.children[i].tagName == "A") {
    //             // is bookmark
    //             data.type = "bookmark";
    //             data.url = node.children[i].getAttribute("href");
    //             data.title = node.children[i].textContent;

    //             var add_date = node.children[i].getAttribute("add_date");
    //             if (add_date) {
    //                 data.add_date = add_date;
    //             }

    //             var icon = node.children[i].getAttribute("icon");
    //             if (icon) {
    //                 data.icon = icon;
    //             }
    //         }
    //         else if (node.children[i].tagName == "H3") {
    //             // is folder
    //             data.type = "folder";
    //             data.title = node.children[i].textContent;

    //             var add_date = node.children[i].getAttribute("add_date");
    //             var last_modified = node.children[i].getAttribute("last_modified");

    //             if (add_date) {
    //                 data.add_date = add_date;
    //             }

    //             if (last_modified) {
    //                 data.last_modified = last_modified;
    //             }
    //             data.ns_root = null
    //             if (node.children[i].hasAttribute('personal_toolbar_folder')) {
    //                 data.ns_root = 'toolbar'
    //             }
    //             if (node.children[i].hasAttribute('unfiled_bookmarks_folder')) {
    //                 data.ns_root = 'unsorted'
    //             }
    //         }
    //         else if (node.children[i].tagName == "DL") {
    //             // store DL element reference for further processing the child nodes
    //             data.__dir_dl = node.children[i];

    //         }
    //     }

    //     // if current item is a folder, but we haven't found DL element for it inside the DT element - check if the next sibling is DD
    //     // and if so check if it has DL element if yes - we just found the DL element for the folder
    //     // if (data.type === 'folder' && !data.__dir_dl) {
    //     //     if (node.nextSibling && node.nextSibling.tagName === 'DD') {
    //     //         let dls = node.nextSibling.getElementsByTagName('DL')
    //     //         if (dls.length) {
    //     //             data.__dir_dl = dls[0]
    //     //         }
    //     //     }
    //     // }

    //     return data;
    // }

    canParse(html: string): boolean {
        for (let i = 0; i < html.length; i++) {
            if (/\s/.test(html[i])) {
                continue
            }
            if (html[i] === '<') {
                break
            }
            else {
                return false;
            }
        }
        var can: boolean = /<dl/i.test(html) &&
            /<\/dl/i.test(html) &&
            /<dt/i.test(html) &&
            /<a[^<>]href\s*=\s*/i.test(html)
        return can;
    }


    prase(html: string): Promise<BookmarkTreeNode> {
        return new Promise((resolve, reject) => {
            if (!this.canParse(html)) reject(new Error('cannot be parsed.'));
            else {

                var parser = new DOMParser();
                var htmlDoc = parser.parseFromString(html, 'text/html');
                var dls = htmlDoc.getElementsByTagName("dl");
                const result = this.getNodeFromDL(dls[0], 0, {} as unknown as BookmarkTreeNode);
                console.log(result);
            }
        })
    }

    // /**
    //  * <DL>안의 
    //  * 1) <DT>-<H3> + <DL>
    //  * 2) <DT>-<A>
    //  * 묶음을 BookmarkTreeNode 형식으로 변경해준다.
    //  * 
    //  * @param DTNode 
    //  * @param index 
    //  * @param parentId 
    //  * @returns 
    //  */
    // private getBookmarkTreeNode(DTNode: Element, index: number, parentId: number): { bookmarkNode: BookmarkTreeNode, nextDL?: Element } {
    //     let retNode: BookmarkTreeNode = {} as BookmarkTreeNode;
    //     let nextDL = undefined;
    //     // console.log('childNode', node.childNodes)
    //     for (let i = 0; i != DTNode.children.length; i++) {
    //         const child = DTNode.children[i];
    //         if (child.tagName === "A") {
    //             // Type : bookmark
    //             retNode.index = index;
    //             retNode.parentId = parentId;
    //             retNode.title = child.textContent ?? '';
    //             retNode.url = child.getAttribute('href') ?? '';
    //             retNode.dataAdded = Number(child.getAttribute('add_date'));
    //         } else if (child.tagName === 'H3') {
    //             // Type : folder 
    //             retNode.parentId = parentId;
    //             retNode.title = child.textContent ?? '';
    //             retNode.dataAdded = Number(child.getAttribute("add_date"));
    //             retNode.dateGroupModified = Number(child.getAttribute("last_modified"));
    //             if (child.nextElementSibling && child.nextElementSibling.tagName === 'DL') {
    //                 nextDL = child.nextElementSibling
    //             }
    //         }
    //     }
    //     return { bookmarkNode: retNode, nextDL: nextDL }
    // }


    // private processDir(dir: Element, parentId: number): BookmarkTreeNode {
    //     var children = dir.children;
    //     var curRoot: BookmarkTreeNode = {} as BookmarkTreeNode;
    //     curRoot.children = [];
    //     curRoot.id = String(parentId) + '0'; // 새롭게 제작해야해요. curId 생성기 만들어주세요. (겹치지 않는걸로..)
    //     curRoot.parentId = parentId;
    //     curRoot.dataAdded
    //     for (let i = 0; i != children.length; i++) {
    //         let child = children[i];
    //         if (!child.tagName) {
    //             continue;
    //         }
    //         if (child.tagName != "DT") {
    //             continue;
    //         }
    //         const { bookmarkNode, nextDL } = this.getBookmarkTreeNode(child, i, level);
    //         curRoot.children.push(bookmarkNode);
    //         if (nextDL) {
    //             const children = this.processDir(nextDL, level + 1)
    //             if (!bookmarkNode.children) bookmarkNode.children = [];
    //             bookmarkNode.children.push(children);
    //         }
    //     }
    //     return curRoot;
    // }


    /** DL에서 데이터를 얻어옵니다. */
    private getNodeFromDL(DLNode: Element, parentId: number, meta?: BookmarkTreeNode): BookmarkTreeNode {
        const DLInfo: BookmarkTreeNode = { ...meta, parentId: parentId } as BookmarkTreeNode;
        const DLChildren = DLNode.children;
        DLInfo.id = String(parentId + 1)
        DLInfo.children = [];

        for (let i = 0; i != DLChildren.length; i++) {
            let DTNode = DLChildren[i];
            if (!DTNode.tagName) {
                continue;
            }
            if (DTNode.tagName != "DT") {
                continue;
            }
            const { bookmarkNode, DLNode } = this.getNodeFromDT(DTNode, i, Number(DLInfo.id));
            if (DLNode) {
                const childDL = this.getNodeFromDL(DLNode, Number(DLInfo.id), bookmarkNode);
                DLInfo.children.push(childDL)
            } else {
                DLInfo.children.push(bookmarkNode);
            }
        }
        return DLInfo;
    }

    /** DT Node에서 데이터를 얻어옵니다. */
    private getNodeFromDT(DTNode: Element, index: number, parentId: number): { bookmarkNode: BookmarkTreeNode, DLNode?: Element } {
        const DTInfo: BookmarkTreeNode = {} as BookmarkTreeNode;
        let nextDL = undefined;
        DTInfo.index = index;
        DTInfo.parentId = parentId;

        for (let i = 0; i != DTNode.children.length; i++) {
            const child = DTNode.children[i];

            if (child.tagName === "A") {
                // Type : bookmark
                DTInfo.title = child.textContent ?? '';
                DTInfo.dataAdded = Number(child.getAttribute('add_date'));
                DTInfo.url = child.getAttribute('href') ?? '';
            } else if (child.tagName === 'H3') {
                // Type : folder 
                DTInfo.title = child.textContent ?? '';
                DTInfo.dataAdded = Number(child.getAttribute('add_date'));
                DTInfo.dateGroupModified = Number(child.getAttribute("last_modified"));
                if (child.nextElementSibling && child.nextElementSibling.tagName === 'DL') {
                    nextDL = child.nextElementSibling
                }
            }
        }
        return { bookmarkNode: DTInfo, DLNode: nextDL }
    }
}