import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonCard = ({ count = 9 }) => {
  return (
    <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
      {Array(count)
        .fill()
        .map((item, index) => (
          <div className="shadow-md" key={index}>
            <Skeleton variant="Text" width={347} height={200} />
            <div className="flex gap-2 flex-col p-5">
              <h4 className="text-base font-bold">
                <Skeleton
                  variant="Text"
                  width={100}
                  height={20}
                  style={{ borderRadius: "4px" }}
                />
              </h4>

              <span className="text-lightPeach text-lg">
                <Skeleton
                  variant="Text"
                  width={308}
                  height={20}
                  style={{ borderRadius: "4px" }}
                />
              </span>
            </div>
          </div>
        ))}
    </section>
  );
};
export default SkeletonCard;
