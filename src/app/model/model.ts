import { Doc } from "./doc";


export interface Service{
    id:string,
    incaricoState:'red'|'green'|'yellow',
    compa:number,
    fiduciario:string,
    tipo_sinistro: string,
    data_incarico:Date,
    nr_sinistro:string | number,
    nr_incarico:number,
    prestazione_richiesta:string,
    assicurato:string,
    targa_assicurato:string,
    controparte:string,
    targa_controparte:string,
    nr_int:number,
    data_ultimo:Date,
    documents:Doc[],
   


}

/* 
{
    "numSx": "0027164811671104511",
    "idInc": "_SO2255287",
    "dtsx": "2022-12-05",
    "dtInc": "2022-12-20",
    "codPer": "0000",
    "nomePer": "PERITO NON SPECIFICATO",
    "emailPer": "CLAIMS@SOGESA.NET",
    "dtPer": "",
    "dtChiusura": "",
    "dtRientro": "",
    "isCom": true,
    "numComLeggere": 2,
    "isComText": null
    },
 */
// sinistri tutti da range data
export interface ServiceReal{
    tipo:'green'
    numSx:string,
    idInc:string,
    dtSx:Date,
    dtInc:Date,
    codPer:string,
    nomePer:string, // fiduciario
    emailper:string,
    dtPer:Date,
    dtChiusura:Date,
    dtRientro:Date,
    isCom:boolean,
    numComLeggere:number,
    isComText:string,

    numsxUrl?:string,
    idIncUrl?:string


}