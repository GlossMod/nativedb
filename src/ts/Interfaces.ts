interface IParams {
    type: string
    name: string
}

interface INative {
    return_type: string
    name: string
    comment: string
    params: IParams[]
    unused?: any
    variadic?: string
    jhash?: string
    build?: string
}

interface INatives {
    [key: string]: {
        [key: string]: INative
    };
}