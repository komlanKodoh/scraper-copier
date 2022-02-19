declare type link = {
  link: string;
  seen: boolean;
  popularity: number;
};

declare type FileObject = {
  name: string;
  extension: string;
  remoteURL: URL
};

declare type CustomError = {
  message: string,
}


declare var _authorized_domain : RegExp[];