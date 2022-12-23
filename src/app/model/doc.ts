export interface DetailDoc{
    name: string, 
    url:string,
    lastModified: string,
    lastModifiedDate: Date,
    webkitRelativePath: string, 
    size: number
}

export interface Download {
    content: Blob | null;
    progress: number;
    state: "PENDING" | "IN_PROGRESS" | "DONE";
  }

export interface Doc{
  id:string,
  nome:string,
  tipo:string,
  dim:number,
  daCom:boolean,
  idCom:any,
  nomeViewUrl:string,
  downUrl:string,
  sizeKB:string,
  daComIcon:string,
  comUrl:string
}

