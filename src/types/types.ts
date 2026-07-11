export type TColumn = {
    id: string;
    label: string;
    tasks: TTask[];
}

export type TTask = {
    id: number;
    title: string;
}

export type TColumns = TColumn[];
export type TTasks = TTask[];
