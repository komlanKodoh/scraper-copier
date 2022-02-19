import dns from "dns";

export function hostNameExists(hostname: string) {
  return new Promise((resolve) => {
    dns.lookup(hostname, (error) => resolve( !error));
  });
}
