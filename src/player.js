export default class Player {
    constructor(name, email, logged) {
        this._name = name;
        this._email = email;
        this._password = "123456";
        this._cash = 500;
        this._tempPoints = 0;
        this._logged = logged;
    }
    name() {
        return this._name;
    }
    email() {
        return this._email;
    }
    pass() {
        return this._password;
    }
    cash() {
        return this._cash;
    }
    tempPoints() {
        return this._tempPoints;
    }
    recordPtBj() {
        return this._recordPointsBJ;
    }
    logged() {
        return this._logged;
    }
    setName(name) {
        this._name = name;
    }
    setEmail(email) {
        this._email = email;
    }
    setPass(pass) {
        this._password = pass;
    }
    setCash(cash) {
        this._cash = cash;
    }
    setTmpPoints(tmp) {
        this._tempPoints = tmp;
    }
    setRecordPtBj(record) {
        this._recordPointsBJ = record;
    }
    setLogged(logged) {
        this._logged = logged;
    }
}
