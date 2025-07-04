import Link from "next/link"

const FlatItem = ({ slug }) => {
    return (
        <>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="img-fluid" src="/img/product1.jpeg" alt="flat" />
                </a>
                <div className="px-5 pb-5">
                    <div className="flex justify-between mb-3">
                        <span className="item-title">Lorem ipsum dolor sit amet consectetur adipiscing elit</span>
                        <span className="item-price flex justify-end items-center">$1000</span>
                    </div>
                 
                        <div className="item-icon d-flex alig-items-center justify-between">
                            <div>
                                <i className="fas fa-check-circle"></i> <span>Rooms</span>
                            </div>
                            <div>
                                <i className="fas fa-check-circle"></i> <span> Bath </span>
                            </div>
                            <Link href={`/flat/${slug}`} className="item-title">
                  <button className="text-white bg-[#364465] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800l">View</button>
                            </Link>
                        </div>
                </div>
            </div>


            {/* --------------- */}
            {/* <div className="text-center col-lg-4 col-12 col-md-6 ">
                <div className="item">
                    <div className="item-image">
                        <img className="img-fluid" src="/img/product1.jpeg" alt="flat" />
                    </div>
                    <div className="item-description">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="item-title">Lorem ipsum dolor sit amet consectetur adipiscing elit</span>
                            <span className="item-price">$1000</span>
                        </div>
                        <div className="item-icon d-flex alig-items-center justify-content-between">
                            <div>
                                <i className="fas fa-check-circle"></i> <span>Lorem ipsum dolor</span>
                            </div>
                            <div>
                                <i className="fas fa-check-circle"></i> <span> Lorem </span>
                            </div>
                            <Link href={`/flat/${slug}`} className="item-title">
                                <button className="btn btn-detail">View</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div> */}
        </>)
}

export default FlatItem