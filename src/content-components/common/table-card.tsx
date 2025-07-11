// PaginatedTableCard.tsx
import { Card } from "react-bootstrap"
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons"
import { useEffect, useState, JSX } from "react"
import { BouncingDotsLoader } from "./bouncy-loader"
import { TableHeader } from "./table-header";

interface TableCardProps<T> {
    title: string;
    data: T[] | null;
    renderTable: (data: T[]) => JSX.Element;
    searchBy: (item: T, term: string) => boolean;
    itemsPerPage?: number;
}

export function TableCard<T>({
    title,
    data,
    renderTable,
    searchBy,
    itemsPerPage = 10
}: TableCardProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (currentPage !== 1) setCurrentPage(1);
    }, [search]);

    const filtered = data?.filter(item => searchBy(item, search)) || [];
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, filtered.length);
    const currentItems = filtered.slice(start, end);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <Card className="shadow" style={{ minHeight: '80vh', maxHeight:'80vh'}}>
            <Card.Header className="secondary-nav d-flex justify-content-between align-items-center">
                <TableHeader table_name={title} />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    style={{ maxWidth: '250px' }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Card.Header>
            <Card.Body className="content px-0 pt-0 pb-0" style={{overflowY:'scroll'}}>
                {data === null ? (
                    <BouncingDotsLoader vh="25" />
                ) : filtered.length === 0 ? (
                    <p className="text-muted text-center mt-3">No matching records found.</p>
                ) : (
                    renderTable(currentItems)
                )}
            </Card.Body>
            <Card.Footer className="secondary-nav">
                <div className="d-flex justify-content-center align-items-center gap-3">
                    <ArrowLeftCircle
                        className="icon-no-focus"
                        size={30}
                        style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed', opacity: currentPage > 1 ? 1 : 0.5 }}
                        onClick={prevPage}
                    />
                    <span className="text-muted small">
                        {filtered.length === 0 ? 0 : start + 1} - {end} of {filtered.length}
                    </span>
                    <ArrowRightCircle
                        className="icon-no-focus"
                        size={30}
                        style={{ cursor: currentPage < totalPages ? 'pointer' : 'not-allowed', opacity: currentPage < totalPages ? 1 : 0.5 }}
                        onClick={nextPage}
                    />
                </div>
            </Card.Footer>
        </Card>
    )
}
