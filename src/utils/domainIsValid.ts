import DomainTracker from "../classes/DomainTracker";
import Logger from "../classes/Logger";
import { hostNameExists } from "./hostNameExists";

export const domainIsValid = async (domainTracker: DomainTracker, domain: string) => {
  // const directories = await domainTracker.getRootDirectories(
  //   domain
  // );

  // if (directories.length > 1)
  //   return true;

    
  //   console.log("The part bellow the thing ran and it is interesting")
  // if (!(await hostNameExists(domain))) {
  //   console.log(
  //     Logger.color(
  //       `\n Domain provided is not recognized as a valid domain: ${domain}`,
  //       "FgRed"
  //     )
  //   );
  // }

  // if (directories.length < 1 && !domain) {
  //   console.log(
  //     Logger.color(
  //       `\n Domain provided has never been fetched : ${domain}`,
  //       "FgRed"
  //     ),
  //     '\n to serve non-saved domain turn the caching flag "-c" on .'
  //   );

  //   return false;
  // }

  return true;
};
