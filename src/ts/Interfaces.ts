interface IParams {
    [key: string]: string
}

interface INative {
    return_type: string
    name: string
    comment: string
    params: IParams[]
    unused?: any
}

interface INatives {
    [key: string]: {
        [key: string]: INative
    };
}