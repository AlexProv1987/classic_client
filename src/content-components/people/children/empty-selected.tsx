interface NoUsersProps {
  message:string,
  optional_msg?:string,
  icon?:React.ElementType
  icon_size?:number,
}
export const NoUserSelected: React.FC<NoUsersProps> = (props) => (
  <div className="text-center text-muted mt-5">
    <div style={{ fontSize: '3rem' }}>{props?.icon ? <props.icon size={props?.icon_size ? props.icon_size : 26}/> : '👤'}</div>
    <p className="fs-5 mt-3">{props.message}</p>
    {props?.optional_msg && 
    <p className="text-secondary">{props.optional_msg}</p>
    }
  </div>
);