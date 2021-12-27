

export const getFileExtension = (fileName: string, if_none?: string) => {
    const temp_arr = fileName.split(".");

    if (temp_arr.length >= 2) return temp_arr.pop();

    else return if_none ?? null ;

}