export interface IBook {
    book_id: number;
    book_name: string;
    author: string;
    borrowed_by: number;
    date_of_borrow: string;
    expected_date_of_return: string;
}