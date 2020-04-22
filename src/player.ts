export default class Player {
    _name : string;
    _email : string;
    _password: string;
    _cash : number;
    _tempPoints : number;
    _recordPointsBJ : number;
    _logged : boolean;

    constructor(name: string, email : string, logged: boolean) {
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

    setName(name: string) {
        this._name = name;
    }

    setEmail(email : string) {
        this._email = email;
    }

    setPass(pass : string) {
        this._password = pass;
    }
    
    setCash(cash : number) {
        this._cash = cash;
    }

    setTmpPoints(tmp : number) {
        this._tempPoints = tmp;
    }

    setRecordPtBj(record : number) {
        this._recordPointsBJ = record;
    }
    setLogged(logged : boolean) {
        this._logged = logged;
    }
}