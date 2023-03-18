import "./Pagination.scss";

const Pagination = ({
    coursesPerPage,
    totalCourses,
    paginate,
    currentPage,
}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container my-4 mx-4 col-span-2">
            <ul className="pagination flex justify-center">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={
                            currentPage === number
                                ? "pagination-number active w-5 h-5 m-2 px-1"
                                : "pagination-number w-5 h-5 m-2 px-1"
                        }
                    >
                        <button onClick={() => paginate(number)}>
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
