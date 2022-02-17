

function propery<T extends string | null >(a: T , b: T extends null ? number : string){

}

propery("jk" , "jk")



function move<T extends {} >(currentState: T, speed: T extends { speed: number } ? undefined: number  ){

}

move({})