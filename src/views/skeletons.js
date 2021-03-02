
import React from 'react';
import { Skeleton } from 'primereact/skeleton';
import '../css/skeletons.css';

function LoadingSkeletonSquare() {
    return (
        <div className="field col-12 md-6">
            <div className="d-flex ai-end">
                <Skeleton size="2rem" className="mr-2"></Skeleton>
                <Skeleton size="3rem" className="mr-2"></Skeleton>
                <Skeleton size="4rem" className="mr-2"></Skeleton>
                <Skeleton size="5rem"></Skeleton>
            </div>
        </div>)
}

function LoadingSkeleton() {
    return (
        <div className="card mt-5">
            <div className="grid formgrid">
                <div className="field col-12 md-6">
                    <Skeleton className="mb-2"></Skeleton>
                    <Skeleton width="10rem" className="mb-2"></Skeleton>
                    <Skeleton width="5rem" className="mb-2"></Skeleton>
                    <Skeleton height="2rem" className="mb-2"></Skeleton>
                    <Skeleton width="10rem" height="4rem"></Skeleton>
                </div>
            </div>
        </div>)
}

function LoadingSkeletonCard() {
    return (
        <div className="grid formgrid mt-4 w-100">
            <div className="field col-12 md-6 pr-md-6 pr-0">
                <div className="custom-skeleton p-4">
                    <div className="d-flex mb-3">
                        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
                        <div>
                            <Skeleton width="10rem" className="mb-2"></Skeleton>
                            <Skeleton width="5rem" className="mb-2"></Skeleton>
                            <Skeleton height=".5rem"></Skeleton>
                        </div>
                    </div>
                    <Skeleton width="100%" height="150px"></Skeleton>
                    <div className="d-flex justify-content-between mt-3">
                        <Skeleton width="4rem" height="2rem"  ></Skeleton>
                        <Skeleton width="4rem" height="2rem" ></Skeleton>
                    </div>
                </div>
            </div>
        </div>)
}

export { LoadingSkeletonSquare, LoadingSkeleton, LoadingSkeletonCard };