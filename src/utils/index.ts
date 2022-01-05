export const getFileExtension = (fileName: string, if_none?: string) => {
  const temp_arr = fileName.split(".");

  if (temp_arr.length >= 2) return temp_arr.pop();
  else return if_none ?? null;
};

export const createInsertValues = (links) => {
  let values = "";
  const len = links.length;
 
  for (let i = 0; i < len - 1; i++) {
    values += `("${links[i]}", 1),`;
  }
  values += `("${links[len - 1]}",1)`;

  return values as string;
};

// export const make_query_sync = ()
