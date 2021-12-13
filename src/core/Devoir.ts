

export class Devoir{
    private _nom : string;
    private _description : string;
    private _noteMaximale : number;
    private _dateDebut : string;
    private _dateFin : string;
    private _etatVisible : boolean;

    constructor(nom : string,
                description : string,
                noteMaximale : number,
                dateDebut : string,
                dateFin : string,
                etat : boolean){
        this._nom = nom;
        this._description = description;
        this._dateDebut = dateDebut;
        this._dateFin = dateFin;
        this._noteMaximale = noteMaximale;
        this._etatVisible = etat;
    }
    
    get nom() {
        return this._nom;
    }

    get description() {
        return this._description;
    }

    get dateDebut() {
        return this._dateDebut;
    }
    get dateFin() {
        return this._dateFin;
    }

    get noteMaximale() {
        return this._noteMaximale;
    }

    get etatVisible() {
        return this._etatVisible;
    }
}