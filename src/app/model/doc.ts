export interface Doc{
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
