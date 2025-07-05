
interface TableHeaderProps{
    table_name:string,
}
export const TableHeader: React.FC<TableHeaderProps> = (props) => {
    return (
        <div className="d-flex align-items-center text-muted small ms-2 mb-2 mt-2">
            <i className="bi bi-table me-2"></i>
            <span>{props.table_name} Table</span>
        </div>
    )
}