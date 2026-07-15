export type TColumn = {
    id: string;
    label: string;
    tasks: TTask[];
}

export type TTask = {
    id: string;
    title: string;
}

export type TColumns = TColumn[];
export type TTasks = TTask[];
