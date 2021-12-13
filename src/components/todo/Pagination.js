import { React, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ReactPaginate from 'react-paginate';

// import { Card } from "@blueprintjs/core";
import '../scss/List.scss';
import '../scss/pagnation.css';
function PaginationTasks(props) {
    const [pageNumber, setPageNumber] = useState(0);
    const userPerPag = 3;
    const pagesVisited = pageNumber * userPerPag;
    const pageCount = Math.ceil(props.list.length / userPerPag);
    const displayTasks = props.list
        .slice(pagesVisited, pagesVisited + userPerPag)
        .map(item => {
            return (
                // <div key={item.id}>
                //     <p>{item.text}</p>
                //     <p>
                //         <small></small>
                //     </p>
                //     <p>
                //         <small></small>
                //     </p>
                //    
                //     <hr />
                // </div>
                <Card style={{ width: '25rem' }}>
                <Card.Body>
              
                <Button onClick={() => props.toggleComplete(item.id)} variant={props.buttonColor}> {item.complete.toString()}</Button>
                  <Card.Title></Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{item.text}</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">Assigned to: {item.assignee}</Card.Subtitle>
                  <Card.Subtitle style={{marginLeft:"17.6rem"}}>
                  Difficulty: {item.difficulty}
                  </Card.Subtitle>
                  <div ></div>
                </Card.Body>
              </Card>
                
             
            )
        })
        const changePage=({selected})=>{
            setPageNumber(selected)
        }
    return (
        <div>
            
            <Card>
                {displayTasks}
                {props.list.length>=3?  <ReactPaginate
                previousLabel = {"Previous"}
                nextLabel = {"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttns"}
                nextLinkClassName={"nextBttns"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
                
                />:null}
               

            </Card>

        </div>

        //     <Pagination>

        //     <Pagination.Item>{1}</Pagination.Item>
        //     <Pagination.Item>{2}</Pagination.Item>
        //     <Pagination.Item>{3}</Pagination.Item>
        //     <Pagination.Item active>{4}</Pagination.Item>
        //     <Pagination.Item>{5}</Pagination.Item>
        //     <Pagination.Item disabled>{6}</Pagination.Item>

        //     <Pagination.Ellipsis />
        //     <Pagination.Item>{20}</Pagination.Item>

        // </Pagination>
    );
}

export default PaginationTasks;