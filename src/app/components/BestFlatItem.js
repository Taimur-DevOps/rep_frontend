import Link from "next/link"

const BestFlatItem = ({ flatState }) => {
    return (

        <div className="grid grid-cols-1 sm:grid-cols-4  gap-4  w-full mx-auto">
            <div className="bg-blue-100 flex flex-col justify-center" >
                <div className="best-estate-img-area">
                    <img className="best-estate-img " src="/img/product1.jpeg" alt="flat" />
                </div>
                <div className="best-estate-content flex gap-2 justify-start items-center">
                    <h4><Link href="/">Lorem Ipsum</Link></h4>
                    <span><Link href="/">Lorem Ipsum</Link></span>
                </div>
                <div className="best-estate-features">
                    <div className="flex">
                        <div className="best-estate-feature">
                            <i className="fas fa-check-circle"></i>
                            <span>3 Beds</span>
                        </div>
                        <div className="best-estate-feature">
                            <i className="fas fa-check-circle"></i>
                            <span>2 Bathrooms</span>
                        </div>
                    </div>
                    <h5 className="best-estate-price">$650</h5>
                </div>
            </div>
            <div className="bg-blue-100 flex flex-col justify-center" >
                <div className="best-estate-img-area">
                    <img className="best-estate-img " src="/img/product1.jpeg" alt="flat" />
                </div>
                <div className="best-estate-content flex gap-2 justify-start items-center">
                    <h4><Link href="/">Lorem Ipsum</Link></h4>
                    <span><Link href="/">Lorem Ipsum</Link></span>
                </div>
                <div className="best-estate-features">
                    <div className="flex">
                        <div className="best-estate-feature">
                            <i className="fas fa-check-circle"></i>
                            <span>3 Beds</span>
                        </div>
                        <div className="best-estate-feature">
                            <i className="fas fa-check-circle"></i>
                            <span>2 Bathrooms</span>
                        </div>
                    </div>
                    <h5 className="best-estate-price">$650</h5>
                </div>
            </div>
            <div className="bg-blue-100 flex flex-col justify-center" >
                <div className="best-estate-img-area">
                    <img className="best-estate-img " src="/img/product1.jpeg" alt="flat" />
                </div>
                <div className="best-estate-content flex gap-2 justify-start items-center">
                    <h4><Link href="/">Lorem Ipsum</Link></h4>
                    <span><Link href="/">Lorem Ipsum</Link></span>
                </div>
                <div className="best-estate-features">
                    <div className="flex">
                        <div className="best-estate-feature">
                            <i className="fas fa-check-circle"></i>
                            <span>3 Beds</span>
                        </div>
                        <div className="best-estate-feature">
                            <i className="fas fa-check-circle"></i>
                            <span>2 Bathrooms</span>
                        </div>
                    </div>
                    <h5 className="best-estate-price">$650</h5>
                </div>
            </div>
            <div className="bg-blue-100 flex flex-col justify-center" >
                <div className="best-estate-img-area">
                    <img className="best-estate-img " src="/img/product1.jpeg" alt="flat" />
                </div>
                <div className="best-estate-content flex gap-2 justify-start items-center">
                    <h4><Link href="/">Lorem Ipsum</Link></h4>
                    <span><Link href="/">Lorem Ipsum</Link></span>
                </div>
                <div className="best-estate-features">
                    <div className="flex">
                        <div className="best-estate-feature">
                            <i className="fas fa-check-circle"></i>
                            <span>3 Beds</span>
                        </div>
                        <div className="best-estate-feature">
                            <i className="fas fa-check-circle"></i>
                            <span>2 Bathrooms</span>
                        </div>
                    </div>
                    <h5 className="best-estate-price">$650</h5>
                </div>
            </div>
        </div>
    )
}

export default BestFlatItem