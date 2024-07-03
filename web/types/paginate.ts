export interface Paginate {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links?: Links[]
}

interface Links {
    url: string,
    label: string,
    active: boolean
}

export interface PaginationProps {
    page: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (newPage: number) => void;
  }
