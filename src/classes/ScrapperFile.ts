import getPathAndFileName from "../lib/getPathAndFileName";

export class ScrapperFile {
  remoteURL: URL;
  name: string;
  directory: string;
  extension: string;

  constructor(url: string, rootDirectory: string) {
    this.remoteURL = new URL(url);

    const [localDirectory, filename, fileExtension] = getPathAndFileName(
      this.remoteURL,
      rootDirectory
    );
    this.name = filename;
    this.extension = fileExtension;
    this.directory = localDirectory;
  }

  
}
