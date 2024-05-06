export interface IExpenseEntry {
    id: number;
    item: string;
    amount: number;
    category: string;
    location: string;
    spendOn: Date;
    createdOn: Date;
}
