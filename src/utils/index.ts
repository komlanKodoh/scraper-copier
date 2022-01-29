export const createInsertValues = (links) => {
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
  if (!global[variableName]) {
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
    for (let i = string.length-1; i >= 0; i--){
      if(string[i] === target) return i;
    }
  }

  return null;
};
