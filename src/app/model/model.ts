import { Doc } from "./doc";

// vecchia mia api
/* export interface Service {
    id: string,
    incaricoState: 'red' | 'green' | 'yellow',
    compa: number,
    fiduciario: string,
    tipo_sinistro: string,
    data_incarico: Date,
    nr_sinistro: string | number,
    nr_incarico: number,
    prestazione_richiesta: string,
    assicurato: string,
    targa_assicurato: string,
    controparte: string,
    targa_controparte: string,
    nr_int: number,
    data_ultimo: Date,
    documents: Doc[],



} */

// sinistri tutti da range data
export interface ServiceReal {
    tipo: number // aggiunto da me tramite assign 
    numSx: string,
    idInc: string,
    dtSx: Date,
    dtInc: Date,
    codPer: string,
    nomePer: string, // fiduciario
    emailper: string,
    dtPer: Date,
    dtChiusura: Date,
    dtRientro: Date,
    isCom: boolean,
    numComLeggere: number,
    isComText: string,
    numsxUrl?: string,
    idIncUrl?: string


}