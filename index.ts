import Parser from './util/NetscapeParser.js';

const parser = new Parser();
const test = `

<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><H3 ADD_DATE="1635933190" LAST_MODIFIED="1636177335" PERSONAL_TOOLBAR_FOLDER="true">북마크바</H3>
    <DL><p>
        <DT><H3 ADD_DATE="1636145148" LAST_MODIFIED="1636177339">Test</H3>
        <DL><p>
            <DT><H3 ADD_DATE="1636173133" LAST_MODIFIED="1636173133">Testfoldwer</H3>
            <DL><p>
            </DL><p>
            <DT><A HREF="http://www.naver.com/" ADD_DATE="1636126934" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA9ElEQVQ4jaWTsUoDQRiEv92sISdERALpEgQfQezyHF5rGksfwSYp06RNqw8iCJY+gIiCpEvgzkD0yN2tRULY/cUV7gYGlmFmmF1Y1UiuP4E21bAybGzVMEDbkJc18mDYWE841ocAWCxp+QXAkY7QKACSci0KxILF6XR/HsxHPGWvPPdu6ZvONvA29Pya3OLRweQkRuUWXFn4jQy5uIjOuIzOfVH4gwUA425MSx0ECopwQb/Z8QXh1xQKjzukxZr7xePvRuHX5AqPDm7e7/jIln6B8P+5AAtJ9s3wZRZcoBoPV+FH+AeGQtfJY+S9KyxQK2p85x+NPGyxHcWlOwAAAABJRU5ErkJggg==">Test</A>
            <DT><A HREF="https://www.29cm.co.kr/product/540105?utm_source=google&utm_medium=display&utm_campaign=conversion_googleshopping&utm_content=540105&BSCPN=CMCOM&BSPRG=GASA&BSCCN1=googleshopping_540105&gclid=Cj0KCQjwrJOMBhCZARIsAGEd4VGh7gzkMRhLTLmiqqf6Wzrp6tC9Oje3VjLhscATDWS9KMwKoqihsZgaAqJfEALw_wcB" ADD_DATE="1636128729" ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAZ0lEQVQ4jc1QQQrAMAjT6q3Q/P+bngvusNKVbg48DJaTRGOiRBkAKCkBEam7bxQzz7r3LiIrr2v7YZ/qxuQj3a0jjEiRdYR0pB8Kxq1mVsolrrWeP3H3rRiC1tpXkfI3AHifmAMAABy9bxNTwP8ITQAAAABJRU5ErkJggg==">[MONAMI/모나미] 153 DIY PEN KIT(6본입/20본입) - 3000 | 온라인 셀렉트샵 29CM</A>
        </DL><p>
    </DL><p>
    <DT><A HREF="http://a/" ADD_DATE="1636144577">awedfasd</A>
</DL><p>


`;

chrome.bookmarks.getTree().then((value) => console.log('chrome Ver', value))
parser.prase(test).then((value) => console.log('finish'))

// parser.prase(test).then((value) => console.log('finish'))
// parser.prase(test).then((value) => {
//     console.log(value);
// })

