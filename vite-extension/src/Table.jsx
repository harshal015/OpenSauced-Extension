import React from "react";

const Table = (props) => {
    return (
        <table className='highlight-table'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Highlight</th>
                    <th>Link to highlight</th>
                </tr>
            </thead>
            <tbody>
                {props.highlightArray.map((highlight) => {
                    return (
                        <tr key={highlight.id}>
                            <td>{highlight.title ? highlight.title : "-"}</td>
                            <td>{highlight.highlight.substr(0, 40)}...</td>
                            <td><a className="highlight-link" target="_blank" href={highlight.url && highlight.url}>here</a></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;