import { useEffect, useState, JSX } from "react"

interface SubNavWrapperProps<T>{
    data: T[],
    renderOpts:(data: T[]) => JSX.Element;
}
export function SubNavWrapper<T>({
   data,
   renderOpts,
}: SubNavWrapperProps<T>) {
    return(
         <nav className="navbar navbar-expand-lg secondary-nav">
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <ul className="navbar-nav d-flex flex-row gap-3">
                    {renderOpts(data)}
                </ul>
            </div>
        </nav>
    )
}