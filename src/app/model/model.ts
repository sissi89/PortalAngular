

export interface Service{
    id:string,
    tipo:'red'|'green'|'yellow',
    compa:number,
    fiduciario:string,
    tipo_sinistro:string,
    data_incarico:Date,
    nr_sinistro:number,
    nr_incarico:number,
    prestazione_richiesta:string,
    assicurato:string,
    targa_assicurato:string,
    controparte:string,
    targa_controparte:string,
    nr_int:number,
    data_ultimo:Date;


}
