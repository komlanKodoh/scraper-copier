export const createInsertValues = (links: string[]) => {
  let values = "";
  const len = links.length;

  for (let i = 0; i < len - 1; i++) {
    values += `("${links[i]}", 1),`;
  }
  values += `("${links[len - 1]}",1)`;

  return values as string;
};

export const castArray = (arg: string | []): string[] => {
  return Array.isArray(arg) ? arg : [arg];
};

export const setGlobal = (variableName: string, value: any) => {
  // @ts-ignore
  if (!global[variableName]) {
    // @ts-ignore
    global[variableName] = value;
  } else {
    throw new Error(
      "Trying to set to existing global variable : " + variableName
    );
  }
};

export const firstEncounter = (
  string: string,
  target: string,
  origin: "l" | "r"
) => {
  if (origin === "l") {
    for (let i = 0; i < string.length; i++) {
      if (string[i] === target) return i;
    }
  } else if (origin === "r") {
    for (let i = string.length - 1; i >= 0; i--) {
      if (string[i] === target) return i;
    }
  }

  return null;
};

export const insertIn = (
  receiver: string,
  index: number,
  stringToInsert: string
) => receiver.slice(0, index) + stringToInsert + receiver.slice(index);

export const parseUrlQuery = (urlQuery: string) => {
  let query;
  if (urlQuery[0] === "?") query = urlQuery.slice(1);
  else query = urlQuery;

  return JSON.parse(
    '{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    function (key, value) {
      return key === "" ? value : decodeURIComponent(value);
    }
  ) as object;
};


