
declare global {
  
  interface link {
    link: string;
    seen: boolean;
    popularity: number;
    content_type?: string;
  }

  interface FileObject  {
    name: string;
    extension: string;
    remoteURL: URL;
  }

  interface CustomError {
    message: string;
  }

  var _authorized_domain: RegExp[];
}


export {};
