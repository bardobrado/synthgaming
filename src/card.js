export default class Card {
    constructor(_sequence, _suits, _valor, _deckTexture) {
        this.suits = _suits;
        this.valor = _valor;
        this.deckTexture = _deckTexture;
        this.width = 3;
        this.height = 4.3;
        this.depth = 0.1;
        this.sequence = _sequence;
    }
    getSuits() {
        return this.suits;
    }
    getValue() {
        return this.valor;
    }
    getDeckTexture() {
        return this.deckTexture;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getSequence() {
        return this.sequence;
    }
    getFaceUV() {
        return this.faceUV;
    }
    getBox() {
        return this.box;
    }
    setSuits(_nipe) {
        this.suits = _nipe;
    }
    setValor(_valor) {
        this.valor = _valor;
    }
    setDeckTexture(_deckTexture) {
        this.deckTexture = _deckTexture;
    }
    setWidth(_width) {
        this.width = _width;
    }
    setHeight(_height) {
        this.height = _height;
    }
    setFaceUV(_faceUV) {
        this.faceUV = _faceUV;
    }
    setBox(box) {
        this.box = box;
    }
}
