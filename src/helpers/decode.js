import he from 'he';

function decodeHtmlEntities(str) {
    return he.decode(str);
}

export default decodeHtmlEntities;
